import { Component, OnInit } from '@angular/core';

import { DashboardDataService } from './../dashboard.data.service';
import { LoanInformationService } from './../../dashboard/shared/loan-Info.service';
import { LoanInfo } from './../loan';
import { Router } from '@angular/router';

@Component({
    selector: 'sl-loan-header',
    templateUrl: 'loan.header.component.html',
})
export class LoanHeaderComponent implements OnInit {
    private _selectedLoan: LoanInfo;
    firstName: string;
    lastName: string;

    /**
     * Creates an instance of LoanHeaderComponent.
     * 
     * @param {Router} router
     * @param {LoanInformationService} loanInfoService
     * @param {DashboardDataService} dashboardDataService
     * 
     * @memberOf LoanHeaderComponent
     */
    constructor(private router: Router,
        private loanInfoService: LoanInformationService, private dashboardDataService: DashboardDataService) {

    }

    /**
     * 
     * 
     * 
     * @memberOf LoanHeaderComponent
     */
    set selectedLoan(value: LoanInfo) {
        this._selectedLoan = value;
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanHeaderComponent
     */
    get selectedLoan() {
        return this._selectedLoan;
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanHeaderComponent
     */
    ngOnInit() {
        if (this.dashboardDataService.SelectedLoan) {
            this.selectedLoan = this.dashboardDataService.SelectedLoan;
            this.firstName = this.dashboardDataService.SelectedLoan.borrowers[0].first_name;
            this.lastName = this.dashboardDataService.SelectedLoan.borrowers[0].last_name;
        }
        // If the selected loan is empty, then
        if (!this.selectedLoan) {
            this.router.navigate(['/dashboard']);
        }
    }
}
