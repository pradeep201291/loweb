import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {
    LoanDetailResponse, GetLoanDetailRequest, GetEligibleProductResponse,
    LockLoanRequest, LockLoanResponse, GetAdjustmentsResponse, RateSheetResponse
} from './loan-details.model';
import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class LoanDetailService {
    // private loanDetailUrl = '/assets/mockData/loanDetail.json';


    isLockLoan: boolean = false;

    /**
     * constructor
     * @param http Http
     * @param appSettings AppSettings
     * 
     */
    constructor(private http: StearnsHttpClient, private appSettings: AppSettings) {
    }

    getMyLoanDetail(request: GetLoanDetailRequest): Observable<LoanDetailResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.methodUrl +
            this.appSettings.serviceConfig.getLoanDetailUrl;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <LoanDetailResponse>response.json();
                return data;
            });
    }

    /**
     * Get Eligible products for selected loan number
     * 
     * @param {string} loan_num
     * @param {string} src
     * @param {string} lock_term
     * @param {string} rate
     * @returns {Observable<GetEligibleProductResponse>}
     * 
     * @memberOf LoanDetailService
     */
    getEligibleProducts(loan_num: string, src: string, lock_term: string, rate: string): Observable<GetEligibleProductResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getEligibleProducts;
        return this.http.post(serviceUrl, { loan_num: loan_num, src: src, lock_term: lock_term, rate: rate })
            .map((response: Response) => {
                let data = <GetEligibleProductResponse>response.json();
                return data;
            });
    }

    /**
     * Loack Loan API called and handled error
     * 
     * @param {{ lock_loan_input: LockLoanRequest }} request
     * @returns {Observable<LockLoanResponse>}
     * 
     * @memberOf LoanDetailService
     */
    lockLoan(request: { lock_loan_input: LockLoanRequest }): Observable<LockLoanResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.lockLoan;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <LockLoanResponse>response.json();
                return data;
            }).catch(this.handleError);
    }

    /**
     * Error handler
     * 
     * @private
     * @param {*} error
     * @returns {Promise<any>}
     * 
     * @memberOf LoanDetailService
     */
    private handleError(error: any): Promise<any> {
        throw error.error_info.message;
    }


    getPriceAdjustmentsForLoan(loan_num: string, src: string, plan_id: string): Observable<GetAdjustmentsResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getAdjustments;
        return this.http.post(serviceUrl, { loan_num: loan_num, src: src, plan_id: plan_id })
            .map((response: Response) => {
                let data = <GetAdjustmentsResponse>response.json();
                return data;
            });
    }

    getRatesheetForLoan(loan_num: string, src: string, plan_id: string): Observable<RateSheetResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getRatesheetForLoan;
        return this.http.post(serviceUrl, { loan_num: loan_num, src: src, plan_id: plan_id })
            .map((response: Response) => {
                let data = <RateSheetResponse>response.json();
                return data;
            });
    }

}
