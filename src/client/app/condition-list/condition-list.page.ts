/**
 * Notification page component
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ConditionList } from './condition-list.model';
import { ConditionListService } from './condition-list.service';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { PagerService } from './../../sl-ui-framework/infrastructure/pagination/pagination.service';



@Component({
    selector: 'sl-condition-list',
    templateUrl: './condition-list.page.html',
    providers: []
})
export class ConditionListPage implements OnInit {

    conditionList: ConditionList[];
    showOutstanding: ConditionList[];
    filteredConditionList: ConditionList[] = [];
    sortBy: string = '';
    sortOrder: string = '';
    isChecked: boolean = false;
    isConditionLoaded: boolean = false;


    pagedConditions: ConditionList[] = [];

    currentPage: number = 0;

    pager: any = {};


    /**
     * Creates an instance of ConditionListPage.
     * 
     * @param {ConditionListService} conditionListService
     * @param {DashboardDataService} dashboardDataService
     * @param {Router} router
     * 
     * @memberOf ConditionListPage
     */
    constructor(private conditionListService: ConditionListService, private dashboardDataService: DashboardDataService,
        private router: Router, private pagerService: PagerService) {
    }

    /**
     * @description
     * Get condition list for selected loan number
     * 
     * @memberOf ConditionListPage
     */
    ngOnInit() {
        let loan = this.dashboardDataService.SelectedLoan;
        if (loan) {
            this.conditionListService.getConditionListDetails(loan.loan_num, loan.src)
                .subscribe((response) => {

                    if (response && response.data) {
                        this.conditionList = response.data;
                        this.filteredConditionList = this.conditionList;
                        this.showOutstanding = response.data.filter(e => e.status === 'Outstanding');
                    } else {
                        this.conditionList = [];
                        this.filteredConditionList = [];
                        this.showOutstanding = [];
                    }
                    this.setPage(1);
                    this.isConditionLoaded = true;

                });
        } else {
            this.router.navigate(['/dashboard']);
        }
    }

    /**
     * Filtering the Outstanding Condition list items
     * 
     */
    showOutstandingConditions(isChecked: boolean) {
        this.sortOrder = '';
        if (isChecked) {
            this.isChecked = true;
            this.filteredConditionList = this.showOutstanding;
        } else {
            this.isChecked = false;
            this.pager = {};
            this.filteredConditionList = this.conditionList;
        }
        this.setPage(1);
    }

    /**
     *  Sorting Condition List based on response
     */
    sortResponsible(sortBy: string, sortOrder: string) {
        this.sortOrder = sortOrder;
        this.sortBy = sortBy;
        if (sortBy === 'type_id') {
            this.filteredConditionList = _.orderBy(this.filteredConditionList, [(e) => e.type_id.toLowerCase()], [sortOrder]);
        } else if (sortBy === 'status') {
            this.filteredConditionList = _.orderBy(this.filteredConditionList, [(e) => e.status.toLowerCase()], [sortOrder]);
        } else if (sortBy === 'date_added') {
            this.filteredConditionList = _.orderBy(this.filteredConditionList, [(e) => e.date_added.toLowerCase()], [sortOrder]);
        } else if (sortBy === 'responsible_party') {
            this.filteredConditionList = _.orderBy(this.filteredConditionList, [(e) => e.responsible_party.toLowerCase()], [sortOrder]);
        } else if (sortBy === 'cond_id') {
            this.filteredConditionList = _.orderBy(this.filteredConditionList, [(e) => e.cond_id], [sortOrder]);
        }
        this.setPage(1);
    }

    /**
     * Helps in moving to next page
     * 
     * 
     * @memberOf ConditionListPage
     */
    next() {
        this.setPage(this.pager.endPage + 1, false);
    }

    /**
     * Helps in moving to previous page
     * 
     * 
     * @memberOf ConditionListPage
     */
    previous() {
        this.setPage(this.pager.startPage - 1, false);
    }

    /**
     * Helps in Tracking current page
     * 
     * @param {number} page
     * 
     * @memberOf ConditionListPage
     */
    setCurrentPage(page: number) {
        this.currentPage = page;
        this.setPage(page);
    }

    /**
     * Interacts with service to get pagination logic
     * 
     * @param {number} page
     * @param {boolean} [withinTheFrame=true]
     * 
     * @memberOf ConditionListPage
     */
    setPage(page: number, withinTheFrame = true) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.filteredConditionList.length, page, withinTheFrame);
        this.pagedConditions = this.filteredConditionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.currentPage = this.pager.currentPage;
    }
}


