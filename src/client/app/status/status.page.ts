/**
 * 
 * 
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StatusService } from './status.service';
import { Snapshot, LoanParam } from './status.model';

import { DashboardDataService } from './../shared/dashboard.data.service';
import 'rxjs/add/operator/switchMap';

declare var $: any;

@Component({
    selector: 'loan-status',
    templateUrl: './status.page.html',
    providers: [StatusService]
})
export class StatusPage {

    loanDetail: LoanParam[];
    midScreenLoanDetail: LoanParam[];
    smallScreenLoanDetail: LoanParam[];

    snapshot: Snapshot;


    /**
     * Creates an instance of StatusPage.
     * 
     * @param {StatusService} statusService
     * @param {ActivatedRoute} route
     * @param {DashboardDataService} dashboardDataService
     * 
     * @memberOf StatusPage
     */
    constructor(private statusService: StatusService, private route: ActivatedRoute, private dashboardDataService: DashboardDataService) {
    }

    ngOnInit() {
        let loan = this.dashboardDataService.SelectedLoan;
        if (loan) {
            this.statusService.getSnapShot(loan.loan_num, loan.src)
                .subscribe((loanResponse) => {
                    // this.status = loanResponse[0];
                    this.snapshot = loanResponse.data.snapshot;
                    this.loanDetail = this.snapshot.loan_params;
                    let midArray: Array<LoanParam> = [], smallArray: Array<LoanParam> = [];
                    this.loanDetail.forEach((x) => {
                        midArray.push(Object.assign({}, x));
                        smallArray.push(Object.assign({}, x));
                    });
                    this.midScreenLoanDetail = midArray;
                    this.smallScreenLoanDetail = smallArray;
                });
        }

    }

    ngAfterViewChecked() {
        let maxHeight = 0,
            windowWidth = $( window ).width();
        $('.status-box').each(function () {
            if ((($(this).height())) > maxHeight) {
                maxHeight = ($(this).height());
            }
        });
        if (windowWidth > 767) {
            if (maxHeight > 200) {
            $('.status-box').height(maxHeight);
            $('.events-info').height(maxHeight - 50);
            $('.key-info').height(maxHeight - 50);
        }
        }
        let boxWidth1 = $('.key-info').width();
        let linePos1 = ((35 * boxWidth1) / 100) + 30;

        let boxWidth2 = $('.events-info').width();
        let linePos2 = ((32 * boxWidth2) / 100) + 33;

        $('.key-info .grey-line').css('left', linePos1);
        $('.events-info .grey-line').css('left', linePos2);

        window.onresize = function () {
            let boxWidth3 = $('.key-info').width();
            let linePos3 = ((35 * boxWidth3) / 100) + 30;

            let boxWidth4 = $('.events-info').width();
            let linePos4 = ((32 * boxWidth4) / 100) + 33;

            $('.key-info .grey-line').css('left', linePos3);
            $('.events-info .grey-line').css('left', linePos4);
        };
    }
}
