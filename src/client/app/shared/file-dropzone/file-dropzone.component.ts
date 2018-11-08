import { Component, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';

declare var Dropzone: any;

@Component({
    selector: 'sl-file-drop',
    templateUrl: './file-dropzone.component.html'
})
export class FileDropZoneComponent implements AfterViewInit, OnDestroy {
    @Output() fileSelectionHandler: EventEmitter<File> = new EventEmitter<File>();

    private dropzone: any;

    /**
     * 
     * 
     * 
     * @memberOf FileDropZoneComponent
     */
    ngAfterViewInit() {
        this.createDropZone();
        this.getSelectedFile();
    }

    /**
     * 
     * 
     * 
     * @memberOf FileDropZoneComponent
     */
    createDropZone() {
        let self = this;
        this.dropzone = new Dropzone('div#filedrop', {
            url: self.urlCallBack,
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 20,
            dictDefaultMessage: '',
            maxFiles: 20,
            acceptedFiles: 'image/*,text/plain,application/pdf',
            clickable: false,
            previewsContainer: false,
            previewTemplate: false
        });
    }

    /**
     * 
     * 
     * 
     * @memberOf FileDropZoneComponent
     */
    getSelectedFile() {
        this.dropzone.on('addedfile', (file: any) => {
            this.fileSelectionHandler.emit(file);
        });
    }

    /**
     * 
     * 
     * @param {any[]} files
     * 
     * @memberOf FileDropZoneComponent
     */
    urlCallBack(files: any[]) {
    }

    /**
     * 
     * 
     * 
     * @memberOf FileDropZoneComponent
     */
    ngOnDestroy() {
        this.dropzone.disable();
    }
}
