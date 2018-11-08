import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoanInformationService } from './../shared/loan-Info.service';
import { Loan, PipelineSearchModel } from './../shared/loan-Info.model';
import { InteractionService } from './../../../sl-ui-framework/infrastructure/interaction.service';
import { DashboardDataService } from './../../shared/dashboard.data.service';
import { FilterPipelineService } from './../shared/filter.pipeline.service';
import { LoanDetailService } from '../../loan-details/loan-details.service';
import { MessageService } from '../../message/shared/message-page.service';
import * as _ from 'lodash';

declare var $: any;
const NUMBER_OF_ITEMS_IN_PAGE = 10;

/**
 * 
 */
@Component({
    selector: 'sl-loanInfo',
    templateUrl: './loan-Info.component.html',
})

export class LoanInformationComponent implements OnInit {
    private _pipeline: PipelineSearchModel;
    sortBy: string = '';
    sortOrder: string = '';
    private openedPopover: string;

    @Input()
    set pipeline(value: PipelineSearchModel) {
        this._pipeline = value;
        if (value) {
            this.sortPipeline();
        }
    }

    get pipeline(): PipelineSearchModel {
        return this._pipeline;
    }


    _filterLoanDetails: Loan[];

    set filterLoanDetails(value: Loan[]) {
        this._filterLoanDetails = value;
        this.currentPage = 1;
        if (value) {
            this.allPages = new Array(Math.ceil(value.length / NUMBER_OF_ITEMS_IN_PAGE));
        } else {
            this.totalItems = 0;
            this.totalAmount = 0;
            this.allPages = null;
        }
    }
    get filterLoanDetails(): Loan[] {
        return this._filterLoanDetails;

    }

    get pagedLoanDetails(): Loan[] {
        return _.chain(this._filterLoanDetails)
            .drop((this.currentPage - 1) * NUMBER_OF_ITEMS_IN_PAGE)
            .take(NUMBER_OF_ITEMS_IN_PAGE).value();
    }
    selectedLoan: Loan;

    totalAmount: number;
    totalItems: number;
    currentPage: number;
    allPages: Array<number>;
    private _currentIndex: number = 0;

    get pages(): Array<number> {
        if (this.allPages) {
            let start = this._currentIndex * 5;
            let limit = 5;
            if (start + limit > this.allPages.length) {
                limit = this.allPages.length - start;
            }
            let result = _.take(this.allPages, limit).map(e => start += 1);
            return result;
        }
        return [];
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanInformationComponent
     */
    next() {
        this.hidePopover();
        // this.currentPage = this._currentIndex; 
        if ((this._currentIndex * 5 + 5) < this.allPages.length) {
            this._currentIndex++;
            this.setCurrentPage((this._currentIndex * 5) + 1);
            // console.log((this._currentIndex * 5) + 1);

        }

    }

    /**
     * 
     * 
     * 
     * @memberOf LoanInformationComponent
     */
    previous() {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            this.setCurrentPage((this._currentIndex * 5) + 1);
        }
        this.hidePopover();
    }

    /**
     * Creates an instance of LoanInformationComponent.
     * 
     * @param {LoanInformationService} loanInfoService
     * @param {DashboardDataService} dashboardDataService
     * @param {InteractionService} interactionService
     * @param {Router} router
     * @param {FilterPipelineService} filterPipelineService
     * 
     * @memberOf LoanInformationComponent
     */
    constructor(private loanInfoService: LoanInformationService,
        private dashboardDataService: DashboardDataService,
        private interactionService: InteractionService, private router: Router,
        private filterPipelineService: FilterPipelineService,
        private loanDetailService: LoanDetailService,
        private messageService: MessageService) {

    }

    /**
     * 
     * Sets the current page
     * 
     * @param {number} page
     * 
     * @memberOf LoanInformationComponent
     */
    setCurrentPage(page: number) {
        this.hidePopover();
        this.currentPage = page;
    }

    /**
     * 
     * hides the popover
     * 
     * @memberOf LoanInformationComponent
     */
    hidePopover() {
        if (this.openedPopover && this.openedPopover !== '') {
            let popup_id = document.getElementById(this.openedPopover);
            if (popup_id && popup_id !== null) {
                popup_id.classList.add('hide');
            }
            this.openedPopover = '';
        }
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanInformationComponent
     */
    ngOnInit() {
        // if (
        //     (this.dashboardDataService.SortBy && this.dashboardDataService.SortBy !== '') &&
        //     (this.dashboardDataService.SortOder && this.dashboardDataService.SortOder !== '')
        // ) {
        //     this.sortLoanApplication(this.dashboardDataService.SortBy, this.dashboardDataService.SortOder);
        // }

        this.interactionService.hideSubject$.subscribe(() => {
            this.hidePopover();
        });
    }

    /**
     * Go to the loan status/ notification
     * 
     * @param {Loan} item
     * 
     * @memberOf LoanInformationComponent
     */
    goToStatus(item: Loan) {
        this.dashboardDataService.SelectedLoan = item;
        this.hidePopover();
        this.router.navigate(['/pipeline/status']);
    }

    private stopEventPropagation() {
        if (window.event) {
            window.event.stopPropagation();
        }
    }
    /**
     * Shows the popup
     * 
     * @param {string} id
     * @param {Loan} item
     * 
     * @memberOf LoanInformationComponent
     */
    showPopup(id: string, item: Loan, event: any) {
        this.selectedLoan = item;

        if (this.openedPopover === id) {
            this.stopEventPropagation();
            return;
        }

        this.hidePopover();

        setTimeout((function () {
            let popup_id = document.getElementById(id);
            popup_id.classList.remove('hide');
            this.openedPopover = id;
            this.stopEventPropagation();
        }).bind(this), 0);

    }
    closePopup() {
        this.interactionService.hidePopover();
    }
    sort(sortBy: string, sortOrder: string) {
        this.pipeline.sortBy = sortBy;
        this.pipeline.sortOrder = sortOrder;
        this.sortPipeline();
    }
    /**
     * Sort items
     * @param {string} field
     * @param {string} sortOrder
     * 
     * @memberOf LoanInformationComponent
     */
    private sortPipeline() {
        // this.hidePopover();

        /**
         * if sorted , go to the first page
         */
        this.currentPage = 1;
        this._currentIndex = 1;
        this.previous();
        switch (this.pipeline.sortBy) {
            case 'closing_date':
                this.filterLoanDetails =
                    _.orderBy(this.pipeline.loans, [(e) => new Date(e.est_closing_date)], [this.pipeline.sortOrder]);
                break;
            case 'borrower':
                this.filterLoanDetails =
                    _.orderBy(this.pipeline.loans, [(e) => e.borrower.toLowerCase()], [this.pipeline.sortOrder]);
                break;
            case 'purpose':
                this.filterLoanDetails =
                    _.orderBy(this.pipeline.loans, [(e) => e.loan_purpose.toLowerCase()], [this.pipeline.sortOrder]);
                break;
            case 'loanNum':
                this.filterLoanDetails =
                    _.orderBy(this.pipeline.loans, [(e) => e.loan_num], [this.pipeline.sortOrder]);
                break;
            case 'status':
                this.filterLoanDetails =
                    _.orderBy(this.pipeline.loans, [(e) => e.status.toLowerCase()], [this.pipeline.sortOrder]);
                break;

            default:
                this.filterLoanDetails = this.pipeline.loans;
                break;
        }
        this.stopEventPropagation();
    }

    onPopoverClick() {
        this.stopEventPropagation();
    }

    /**
     * @desc selected loan is received as a param from {showPopup}
     * 
     * 
     * @memberOf LoanInformationComponent
     */
    goToMessage(event: any) {
        this.dashboardDataService.SelectedLoan = this.selectedLoan;
        this.hidePopover();
        this.stopEventPropagation();
        this.messageService.selectedContactName = this.selectedLoan.borrowers[0].last_name + ',' +
            this.selectedLoan.borrowers[0].first_name;
        this.router.navigate(['/pipeline/message']);
    }

    goToUploadDoc(event: any) {
        this.dashboardDataService.SelectedLoan = this.selectedLoan;
        this.hidePopover();
        this.stopEventPropagation();
        this.router.navigate(['/pipeline/documents']);
    }

    goToLockRate(event: any) {
        this.dashboardDataService.SelectedLoan = this.selectedLoan;
        this.hidePopover();
        if (this.selectedLoan.allow_lock === 'false') {
            $('#rate-locked').modal();
        }
        this.stopEventPropagation();
        if (this.selectedLoan.allow_lock === 'true') {
            this.searchPipeline();
        }
    }

    private searchPipeline() {
        this.loanInfoService
            .searchPipeline('', this.selectedLoan.loan_num, false)
            .subscribe((response) => {
                this.selectedLoan = response.data.loans[0];
                if (response.data.loans[0].allow_lock === 'true') {
                    this.loanDetailService.isLockLoan = true;
                    this.router.navigate(['/pipeline/loandetails']);
                } else {
                    $('#rate-locked').modal();
                }
            });
    }
}



