import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Loan } from '../documents.model';
import { DocumentService } from '../documents.service';

import { FileInfo, UploadStatus } from './upload-documents.model';
import { UploadDocumentResponse } from './../documents.model';
import { DocumentUploadService } from './upload-document.service';
import { GlobalConstants } from './../../core/global-constant/global-constant';
import { ApiResponse } from './../../../sl-ui-framework/infrastructure/api-response.typedef';

import { AppSettings } from './../../core/global-configuration/settings';


declare var $: any;
declare var Dropbox: any;


@Component({
    selector: 'sl-upload-documents',
    templateUrl: './upload-documents.component.html',
    providers: [DocumentUploadService]
})
export class UploadDocumentPage {
    selectedFile: FileInfo;
    validationMessage: string;
    initialValidationMessage: string;
    selectedFiles: FileInfo[] = [];
    uploadedFiles: FileInfo[] = [];
    fileCount: number = 0;
    sameFileError: string;
    isRetryVisible: boolean = false;
    isUploadClicked: boolean = false;
    currentLoan: Loan;
    validFiles: any[];
    successCount: number;
    failureCount: number;
    @Output() onUpload = new EventEmitter<void>();

    /**
     * 
     * 
     * @type {Loan}
     * @memberOf ViewDocumentPage
     */
    @Input() set selectedLoan(value: Loan) {
        if (value) {
            this.selectedFiles = [];
            this.currentLoan = value;
        }
    }
    // ngDoCheck() {
    //     this.removeUploadedFiles();
    // }

    constructor(private documentService: DocumentService,
        private ngZone: NgZone,
        private appSettings: AppSettings,
        private documentUploadService: DocumentUploadService) {
    }

    /**
     * 
     * 
     * 
     * @memberOf DocumentSelectorComponent
     */
    uploadFileHandler() {
        $('#documentSelector').modal('hide');
        $('#fileUpload').click();
    }


    /**
     * 
     * 
     * @param {*} event
     * @returns
     * 
     * @memberOf UploadDocumentPage
     */

    fileChangeEvent(event: any) {
        this.fileCount = this.selectedFiles.length;
        let files = event.target.files;
        this.validationMessage = null;
        this.sameFileError = null;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                this.allSelectedFiles(files[i], i);
            }
            $('#fileUpload').val('');
            $('#documentSelector').modal('hide');

        }
    }

    allSelectedFiles(file: any, count: number) {
        this.initialValidationMessage = null;
        // if (this.fileCount + count < 5) {
        if (!GlobalConstants.fileUploadTypes.find(x => x === file.type) || file.name.includes('.jfif')) {
            this.initialValidationMessage = GlobalConstants.fileTypeRestrictionValidationMessage;
            $('#documentSelector').modal('hide');
            return;
        }
        if (file.size <= GlobalConstants.fileUploadSieLimit) {
            let reader = new FileReader();
            reader.addEventListener('load', function () {
                // update the selected file once the file content is read to base64 string
                this.selectedFile = file;
                /**
                 * The string content will contain a header information 'application/{file_type};base64,'
                 * remove that header information and convert it to raw base64
                 **/
                let header = ';base64,';
                let content = reader.result;
                let index = content.indexOf(header, header.length);
                let base64 = content.substring(index).replace(header, '');
                this.selectedFile.content = base64;
                this.addFile();
                this.fileCount++;
            }.bind(this), false);
            reader.readAsDataURL(file);
        } else {
            this.initialValidationMessage = GlobalConstants.fileSizeLimitValidationMessage;
        }
        // } else {
        //     this.validationMessage = 'More than 5 files are not allowed';
        // }
    }

    /**
     * 
     * this method will add each file to the selectedfiles array.
     * 
     * @memberOf UploadDocumentPage
     */
    addFile() {
        this.selectedFiles.push({
            lastModifiedDate: this.selectedFile.lastModifiedDate,
            name: this.selectedFile.name,
            size: this.selectedFile.size,
            type: this.selectedFile.type,
            showConditions: false,
            uploadStatus: UploadStatus.InProgress,
            content: this.selectedFile.content,
            loanNumber: this.currentLoan.loan_num,
            is_selected: true
        });
    }


    /**
     * 
     * button click event handler for uploading all the selected documnents
     * 
     * @memberOf UploadDocumentPage
     */
    onUploadDocumentClick() {
        this.validationMessage = '';
        this.isUploadClicked = true;
        this.initialValidationMessage = null;
        this.successCount = 0;
        this.failureCount = 0;
        let i = 0;
        let uploadFileTasks = this.selectedFiles.map(eachFile => this.uploadDocument(eachFile));
        Observable.forkJoin(uploadFileTasks)
            .subscribe(taskResponse => {
                taskResponse.forEach(eachTask => {
                    if (eachTask && eachTask.data.upload_status === 'Success') {
                        this.selectedFiles[i].uploadStatus = UploadStatus.Successful;
                        this.successCount += 1;
                    }
                    i += 1;
                    this.validateErrorMessage();
                });
                this.onUpload.emit();
                this.isUploadClicked = false;
            }, error => {
                this.selectedFiles[i].uploadStatus = UploadStatus.Failure;
                this.failureCount += 1;
                i += 1;
                this.validateErrorMessage();
            });
        /**
         * Reset the upload control
         */
        $('#fileUpload').val('');
    }

    /**
     * Displays the error message based on uploaded response
     * 
     * 
     * @memberOf UploadDocumentPage
     */
    validateErrorMessage() {
        console.log(this.failureCount);
        if (this.successCount === this.selectedFiles.length) {
            this.selectedFiles = [];
            this.validationMessage = 'Your Document Upload was successful';
            this.isUploadClicked = false;
            this.isRetryVisible = false;
        }
        if ((this.successCount < this.selectedFiles.length) && ((this.successCount + this.failureCount) === this.selectedFiles.length)) {
            this.selectedFiles = this.selectedFiles.filter(each => each.uploadStatus === UploadStatus.Failure);
            this.validationMessage = 'Upload Failed. Please retry.';
            this.isRetryVisible = true;
            this.isUploadClicked = false;
        }
    }

    /**
     * Remove each selected file on button click
     * 
     * @param {FileInfo} file
     * 
     * @memberOf UploadDocumentPage
     */
    removeFile(file: FileInfo) {
        if (!this.isUploadClicked) {
            file.is_selected = false;
            this.selectedFiles = this.selectedFiles.filter(e => e.is_selected === true);
            this.initialValidationMessage = null;
            this.validationMessage = null;
            if (this.selectedFiles.length === 0) {
                this.isRetryVisible = false;
            }

        }
    }

    /**
     * 
     * Call the upload document service
     * @private
     * @param {FileInfo} file
     * 
     * @memberOf UploadDocumentPage
     */
    private uploadDocument(file: FileInfo): Observable<ApiResponse<UploadDocumentResponse>> {
        return this.documentUploadService.uploadDocument({
            document_name: file.name.replace(/\.[^/.]+$/, ''),
            file_name: file.name,
            image: file.content,
            loan_num: file.loanNumber,
            need_ids: [],
            type: 'condition'
        });
    }


    getdroppedFiles(files: File) {
        this.validationMessage = '';
        this.initialValidationMessage = '';
        if (files) {
            this.allSelectedFiles(files, 1);
        }
        $('#documentSelector').modal('hide');
    }
}


