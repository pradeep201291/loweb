import { Component } from '@angular/core';
import { DocumentService } from '../documents.service';
import { Documents, DocumentData, Loan } from '../documents.model';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as _ from 'lodash';
import { DashboardDataService } from '../../shared/dashboard.data.service';
import { PagerService } from './../../../sl-ui-framework/infrastructure/pagination/pagination.service';

declare var $: any;
declare var Tiff: any;

const docType = {
    text: 'text/plain',
    pdf: 'application/pdf',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    png: 'image/png',
    tif: 'image/tiff',
    tiff: 'image/tiff'
};
const docIcon = {
    txt: 'txttype-icon',
    pdf: 'pdftype-icon',
    jpeg: 'imgtype-icon',
    jpg: 'imgtype-icon',
    gif: 'imgtype-icon',
    png: 'imgtype-icon',
    tif: 'imgtype-icon',
    tiff: 'imgtype-icon',
    doc: 'doctype-icon',
    default: 'doc-icon'
};
@Component({
    selector: 'sl-view-documents',
    templateUrl: './view-documents.component.html',
    providers: []
})
export class ViewDocumentPage {

    loan: Loan;
    documents: Documents[];
    documentData: DocumentData;
    imageUrl: string;
    sortBy: string = '';
    sortOrder: string = '';
    sanitizedUrl: SafeResourceUrl;
    pager: any = {};
    pagedDocuments: Documents[] = [];
    currentPage: number = 0;
    isIeOrSafari: boolean;
    binary: any;
    decodedString: string;
    ispdf: boolean = false;
    isDocumentsLoaded: boolean = false;
    isTiff: boolean = false;
    documentName: string;
    /**
     * Helps in moving to next page
     */
    next() {
        this.setPage(this.pager.endPage + 1, false);
    }

    /**
     * Helps in moving to previous page
     */
    previous() {
        this.setPage(this.pager.startPage - 1, false);
    }

    /**
     * Helps in Tracking current page
     */
    setCurrentPage(page: number) {
        this.currentPage = page;
        this.setPage(page);
    }

    /**
     * Interacts with service to get pagination logic
     */
    setPage(page: number, withinTheFrame = true) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.documents.length, page, withinTheFrame);
        this.pagedDocuments = this.documents.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.currentPage = this.pager.currentPage;
    }

    /**
     * Creates an instance of ViewDocumentPage.
     * 
     * @param {DocumentService} documentService
     * @param {DomSanitizer} sanitizer
     * @param {DashboardDataService} dashboardDataService
     * 
     * @memberOf ViewDocumentPage
     */
    constructor(private documentService: DocumentService, private sanitizer: DomSanitizer,
        private dashboardDataService: DashboardDataService, private pagerService: PagerService) {
    }

    /**
     * 
     * Get the document for selected Loan
     * 
     * @memberOf ViewDocumentPage
     */
    ngOnInit() {
        this.loan = this.dashboardDataService.SelectedLoan;
        if (this.loan) {
            this.getDocuments();
        }
    }

    getDocuments() {
        if (this.documentService.isDocumentUploaded) {
            this.sortOrder = 'desc';
            this.sortBy = 'last_update_datetime';
        }
        this.documentService.getLoanDocuments(this.loan.loan_num, this.loan.src)
            .subscribe((response) => {
                this.pagedDocuments = [];
                this.documents = response.data;
                if (this.sortOrder !== '' && this.sortBy !== '') {
                    this.sortNeeds(this.sortBy, this.sortOrder);
                } else if (this.documents.length > 0) {
                    this.setPage(1);
                }
                this.isDocumentsLoaded = true;
            });
    }

    /**
     * Bypass the security for unsafe URl
     * 
     * @param {string} url
     * @returns
     * 
     * @memberOf ViewDocumentPage
     */
    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }


    /**
     * Make the call and view the document based on the document ID
     * 
     * @param {string} id
     * 
     * @memberOf ViewDocumentPage
     */
    viewDocument(document: Documents) {
        this.decodedString = '';
        this.documentName = document.document_name;
        let loan = this.dashboardDataService.SelectedLoan;
        this.sanitizedUrl = '';
        if (loan) {
            this.documentService.viewDocuments(loan.src, loan.loan_num, document.document_id)
                .subscribe((response) => {
                    this.documentData = response.data;
                    let documentType = this.documentData.document_type;
                    _.isUndefined(docType[documentType.toLowerCase()]) ? documentType = docType.text :
                        documentType = docType[documentType.toLowerCase()];
                    this.binary = this.convertStringToData(this.documentData.image, documentType);

                    this.isIeOrSafari = this.ispdf = this.isTiff = false;
                    this.imageUrl = URL.createObjectURL(this.binary);

                    this.ispdf = (documentType === docType.pdf);

                    if (documentType === docType.text) {
                        this.decodedString = atob(this.documentData.image);
                    }

                    if (documentType !== docType.tif && documentType !== docType.pdf
                        && documentType !== docType.text && documentType !== docType.tiff) {
                        if (window.navigator.msSaveOrOpenBlob ||
                            (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0)) {
                            this.isIeOrSafari = true;
                        }
                    }

                    if (documentType === docType.tif || documentType === docType.tiff) {
                        this.isTiff = true;
                        this.renderTiff(this.binary);
                    }

                    if ((this.imageUrl && !_.isUndefined(this.imageUrl)) || (this.binary && !_.isUndefined(this.binary))
                        && documentType !== docType.tif && documentType !== docType.tiff) {
                        $('#documentView').bind('contextmenu', function (event: any) {
                            event.preventDefault();
                        });
                        $('#documentView').modal('show');
                    }

                });
        }
    }

    renderTiff(binary: any) {
        if (binary && !_.isUndefined(binary)) {
            let fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                Tiff.initialize({
                    TOTAL_MEMORY: 100000000
                });
                let tiff = new Tiff({
                    buffer: fileReader.result
                });
                let tiffCanvas = tiff.toCanvas();
                $(tiffCanvas).css({
                    'width': '50%',
                    'height': '100%',
                    'display': 'inline-block',
                    'overflow-y': 'auto'
                }).addClass('preview');
                $('#documentView .modal-body').append(tiffCanvas);
            });
            fileReader.onloadend = function (e) {
                $('#documentView').bind('contextmenu', function (event: any) {
                    event.preventDefault();
                });
                $('#documentView').modal('show');
            };

            fileReader.readAsArrayBuffer(binary);
        }
    }


    /**
     * 
     * open the modal for view document
     * 
     * @memberOf ViewDocumentPage
     */
    closeModal() {
        $('#documentView .preview').remove();
        $('#documentView').modal('hide');
    }


    /**
     * Blob the string into the desired format
     * 
     * @param {string} b64Data
     * @param {string} contentType
     * @returns
     * 
     * @memberOf ViewDocumentPage
     */
    convertStringToData(b64Data: string, contentType: string) {
        contentType = contentType || '';
        let sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        let byteCharacters = window.atob(b64Data);
        let byteArrays: Int32Array[] = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }


    /**
     * Sort the fields for Document Name, Category, updated user name, updated date time
     * 
     * @param {string} field
     * @param {string} sortOrder
     * 
     * @memberOf ViewDocumentPage
     */
    sortNeeds(field: string, sortOrder: string) {
        this.sortBy = field;
        this.sortOrder = sortOrder;

        if (field === 'document_name') {
            this.documents = _.orderBy(this.documents, [(e) => e.document_name.toLowerCase()], [sortOrder]);
        } else if (field === 'category') {
            this.documents = _.orderBy(this.documents, [field], [sortOrder]);
        } else if (field === 'last_update_username') {
            this.documents = _.orderBy(this.documents, [field], [sortOrder]);
        } else if (field === 'last_update_datetime') {
            this.documents = _.orderBy(this.documents, [field], [sortOrder]);
        }
        if (this.documents.length > 0) {
            this.setPage(1);
        }
    }

    ngAfterContentInit() {

    }

    setDocumentIcon(doctype: string) {
        if (!doctype && doctype === null) {
            doctype = 'default';
        }
        if (!docIcon[doctype.trim().toLowerCase()]) {
            doctype = 'default';
        }
        return docIcon[doctype.trim().toLowerCase()];
    }
}
