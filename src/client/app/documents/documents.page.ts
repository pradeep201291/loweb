/**
 * Document page component
 * 
 */
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';

import { ViewDocumentPage } from './view-documents/view-documents.component';
import { Loan } from './documents.model';
import { DashboardDataService } from '../shared/dashboard.data.service';
import { DocumentService } from './documents.service';
declare var $: any;
@Component({
    selector: 'sl-documents',
    templateUrl: './documents.page.html',
    providers: []
})
export class DocumentPage implements OnInit, OnDestroy {

    @ViewChild(ViewDocumentPage)
    private viewDocumentComponent: ViewDocumentPage;
    selectedLoan: Loan;

    constructor(private dashboardDataService: DashboardDataService, private documentService: DocumentService) {

    }

    /**
        * Refresh the page.
        * 
        * 
        * @memberOf DocumentPage
        */
    onUpload() {
        this.documentService.isDocumentUploaded = true;
        this.viewDocumentComponent.getDocuments();
    }

    ngOnDestroy(): void {
        if ($('.modal-backdrop.in').is(':visible')) {
            $('.modal-backdrop.in').hide();
        }
    }

    ngOnInit() {
        this.selectedLoan = this.dashboardDataService.SelectedLoan;
    }
}


