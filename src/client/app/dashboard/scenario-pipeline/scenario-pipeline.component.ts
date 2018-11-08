/**
 * Scenario Pipeline Cmponent
 */
import { Component, Input } from '@angular/core';

import { GetScenarioPipelineRequest, PriceQuote } from '../dashboard.typedef';
import { Router } from '@angular/router';
import { DashboardDataService } from './../shared/dashboard-data.service';
import { PagerService } from './../../../sl-ui-framework/infrastructure/pagination/pagination.service';




import * as _ from 'lodash';

@Component({
    selector: 'sl-scenario-pipeline',
    templateUrl: './scenario-pipeline.component.html',
    providers: []
})
export class ScenarioPipelineComponent {

    getScenarioPipelineRequest: GetScenarioPipelineRequest;
    priceQuotes: PriceQuote[];
    sortBy: string = '';
    sortOrder: string = '';
    pager: any = {};
    currentPage: number = 0;
    pagedPriceQuotes: PriceQuote[] = [];

    /**
     * 
     * get the input and assign to priceQuote
     * 
     * @memberOf ScenarioPipelineComponent
     */
    @Input() set scenarioData(value: PriceQuote[]) {
        if (value) {
            this.priceQuotes = value;
            this.setPage(1);
        }
    }

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
        this.pager = this.pagerService.getPager(this.priceQuotes.length, page, withinTheFrame);
        this.pagedPriceQuotes = this.priceQuotes.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.currentPage = this.pager.currentPage;
    }


    constructor(private router: Router, private dashboardDataService: DashboardDataService, private pagerService: PagerService) {

    }

    /**
     * Sort acsendinf and descending based on the field
     * 
     * @param {string} field
     * @param {string} sortOrder
     * 
     * @memberOf ScenarioPipelineComponent
     */
    sortLoanApplication(field: string, sortOrder: string) {
        this.sortBy = field;
        this.sortOrder = sortOrder;
        if (this.priceQuotes) {
            switch (field) {
                case 'borrowerName':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.borrower_name.toLowerCase()], [sortOrder]);
                    break;
                case 'scenarioNumber':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.scenario_count], [sortOrder]);
                    break;
                case 'loanAmount':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.loan_amount], [sortOrder]);
                    break;
                case 'ltv':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.ltv], [sortOrder]);
                    break;
                case 'createdDate':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.created_date], [sortOrder]);
                    break;
                case 'modifiedDate':
                    this.priceQuotes = _.orderBy(this.priceQuotes, [(e) => e.modified_date], [sortOrder]);
                    break;
                default:
                    break;
            }
            this.setPage(1);
        }
    }

    navigateToScenarioDetails(priceQuote: PriceQuote) {
        this.router.navigate(['/pricing/scenarios/'
            + priceQuote.price_quote_id
            + '/' + encodeURIComponent(priceQuote.borrower_name)]);
        this.dashboardDataService.reset();
    }
}
