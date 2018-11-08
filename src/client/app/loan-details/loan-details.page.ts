import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { LoanInfo } from './../shared/service/models/GetMyLoansResponse';
import { LoanDetailService } from './loan-details.service';
import { Loan, Borrower, EligibleProduct, LockStatus, PriceList } from './loan-details.model';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { AdjustmentsData } from './../product-pricing/product-pricing.typedef';

import { ProductPricingService } from '../../app/product-pricing/product-pricing.service';
declare var $: any;


/**
 * @description loan details page component
 * 
 * @export
 * @class LoanDetailsPage
 */
@Component({
    selector: 'loan-details',
    templateUrl: './loan-details.page.html'
})

export class LoanDetailsPage {
    _selectedLoan: LoanInfo;
    loanDetailslist: Loan;
    borrowerDetail: Borrower[];
    isBorrower: boolean = true;
    isLoanDetails: boolean = true;
    isRateDetails: boolean = true;
    isClosingDetails: boolean = true;
    eligibleProduct: EligibleProduct;
    eligibleProductErr: boolean = false;
    discountPoints: string;
    discountCost: string;
    lockStatus: LockStatus;
    adjustmentsData: AdjustmentsData;
    activeRatesheet: PriceList[];
    isDiscountPointsNegative: boolean = false;
    isDiscountCostNegative: boolean = false;
    lockLoanError: string = '';
    isLockLoanSuccessful: boolean = false;
    noProductsErr: boolean = false;
    lockTerm: string = '';
    rate: string = '';
    selectedProduct: EligibleProduct;
    selectedColumn: string = '#borrower-details';
    isLoading: boolean = false;
    lockLoanSuccess: string;

    constructor(private loanDetailService: LoanDetailService, private route: Router,
        private dashboardDataService: DashboardDataService, private productPricingService: ProductPricingService) {
    }


    /**
     * 
     * @description called at page load
     * 
     * @memberOf LoanDetailsPage
     */
    ngOnInit() {
        let loan = this.dashboardDataService.SelectedLoan;

        if (loan) {
            this.loadLockloanData();
            this.loanDetailService.getMyLoanDetail({ loan_num: loan.loan_num, src: loan.src })
                .subscribe(loandetailsResponse => {
                    this.loanDetailslist = loandetailsResponse.data.loan;
                    this.borrowerDetail = loandetailsResponse.data.loan.borrowers;
                });
        } else {
            this.route.navigate(['/dashboard']);
        }
    }


    onSign(type: string) {
        switch (type) {
            case 'borrower':
                this.isBorrower = !this.isBorrower;
                break;
            case 'loanDetails':
                this.isLoanDetails = !this.isLoanDetails;
                break;
            case 'rateDetails':
                this.isRateDetails = !this.isRateDetails;
                break;
            case 'closingDetails':
                this.isClosingDetails = !this.isClosingDetails;
                break;
        }
    }

    lockLoan() {
        let request = {
            lock_loan_input: {
                loan_num: this.dashboardDataService.SelectedLoan.loan_num,
                src: this.dashboardDataService.SelectedLoan.src,
                plan_id: this.eligibleProduct.plan_id,
                rate: Number(this.eligibleProduct.rate),
                price: this.eligibleProduct.borrower_price,
                lock_term: this.eligibleProduct.term
            }
        };
        this.lockLoanError = '';
        this.loanDetailService.lockLoan(request)
            .subscribe(lockStatus => {
                if (lockStatus.completion.c === 0) {
                    this.isLockLoanSuccessful = true;
                    this.lockLoanSuccess = lockStatus.data.status;
                    // Load the loan details after the loan is locked
                    this.loanDetailService.getMyLoanDetail({
                        loan_num: this.dashboardDataService.SelectedLoan.loan_num,
                        src: this.dashboardDataService.SelectedLoan.src
                    })
                        .subscribe(loandetailsResponse => {
                            this.loanDetailslist = loandetailsResponse.data.loan;
                            this.borrowerDetail = loandetailsResponse.data.loan.borrowers;
                            this.scrollLoanDetails('borrower-details');
                        });
                }
            }, error => { this.lockLoanError = error; });
    }

    /**
      * load the adjustments data
      * 
      * 
      * @memberOf EligibleProductListComponent
      */
    loadAdjustments(product: EligibleProduct) {
        this.adjustmentsData = null;
        this.loanDetailService.getPriceAdjustmentsForLoan(this.dashboardDataService.SelectedLoan.loan_num,
            this.dashboardDataService.SelectedLoan.src,
            this.eligibleProduct.plan_id.toString())
            .subscribe(items => {
                this.adjustmentsData = items.data;
            });
    }

    /**
     * Lock the loan data
     * 
     * 
     * @memberOf LoanDetailsPage
     */
    loadLockloanData() {
        let products: EligibleProduct[];
        this.isLoading = true;
        this.loanDetailService.getEligibleProducts(this.dashboardDataService.SelectedLoan.loan_num,
            this.dashboardDataService.SelectedLoan.src, this.lockTerm, this.rate)
            .subscribe(eligibleProduct => {
                this.isLoading = false;
                products = eligibleProduct.data.eligible_products;
                if (products.length <= 0) {
                    this.eligibleProductErr = true;
                    products = eligibleProduct.data.ineligible_products;
                    if (products.length <= 0) {
                        this.noProductsErr = true;
                    }
                    if (products.length === 0) {

                    }
                } else {
                    this.eligibleProduct = products[0];
                    this.isDiscountPointsNegative = false;
                    this.discountPoints = Number(100 - products[0].lender_price).toFixed(4);
                    if (this.discountPoints.toString().includes('-')) {
                        this.isDiscountPointsNegative = true;
                        let roundDecimal = Number((this.discountPoints).toString().substring(1, 15)).toFixed(4);
                        this.discountPoints = roundDecimal;
                    }
                    this.discountCost = Number(((products[0].loan_amt * (100 - products[0].lender_price)) / 100).
                        toString().substring(0, 15)).toFixed(2);
                    if (this.discountCost.toString().includes('-')) {
                        this.isDiscountCostNegative = true;
                        let roundDecimal = Number((this.discountCost).toString().substring(1, 15)).toFixed(2);
                        this.discountCost = roundDecimal;
                    }
                }
            }, error => {
                this.isLoading = false;
            });
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanDetailsPage
     */
    loadRateSheet(eligibleProduct: EligibleProduct): void {
        this.selectedProduct = eligibleProduct;
        this.activeRatesheet = null;
        if (this.isLockLoanSuccessful === false) {
            let loan_num: string = this.dashboardDataService.SelectedLoan.loan_num;
            let src: string = this.dashboardDataService.SelectedLoan.src;
            let plan_id: string = this.eligibleProduct.plan_id.toString();
            this.loanDetailService.getRatesheetForLoan(loan_num, src, plan_id)
                .subscribe(items => {
                    this.activeRatesheet = items.data.ratesheet;
                });
        }
    }

    /**
     * 
     * 
     * 
     * @memberOf LoanDetailsPage
     */
    getNewPriceIt() {
        this.lockTerm = this.productPricingService.selectedPriceList.ratesheet_col_desc;
        this.rate = this.productPricingService.selectedPriceList.selected_price_list;
        this.loadLockloanData();
    }


    /**
     * Scroll to particular div of loan details page
     * 
     * @param {string} type
     * 
     * @memberOf LoanDetailsPage
     */
    scrollLoanDetails(type: string) {
        this.selectedColumn = '#' + type;
        $('html, body').animate({
            'scrollTop': ($(this.selectedColumn).position().top) + 25
        });
    }

    ngOnDestroy() {
        if ($('.modal-backdrop.in').is(':visible')) {
            $('.modal-backdrop.in').hide();
        }
    }

    // ngAfterViewChecked() {
    //     $( window ).scroll(function() {
    //         var panel = $('.details-panel');
    //        var window_offset = panel.offset().top - $(window).scrollTop();
    //        if(window_offset > 150 && window_offset < 180){
    //            debugger;
    //            var panelId = this.panel.attr("id");
    //            console.log(panelId);
    //        }
    //     });
    // }

    ngAfterViewChecked() {
        if (this.loanDetailService.isLockLoan && this.loanDetailslist) {
            this.scrollLoanDetails('lock-loan-details');
            this.loanDetailService.isLockLoan = false;
        }
    }
}
