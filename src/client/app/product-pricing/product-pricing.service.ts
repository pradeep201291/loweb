import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';
import { AppSettings } from './../core/global-configuration/settings';
import {
    PriceItEnumResponse, PriceItenumType, RateSheetResponse, ProductPricingList, GetPriceItRequest,
    PriceItResponse, PriceItEnumListData, PriceItAdjustmentsResponse, GetPriceItInput, GetRateSheetRequest,
    SaveScenarioResponse, ScenarioDetailsRequest, ScenarioDetailsResponse, ZIpCodeResponse
} from './product-pricing.typedef';
import { SelectedPriceList } from './price-list/price-list.typedef';

/**
 * A service for document upload
 * 
 * @export
 * @class DocumentUploadService
 */
@Injectable()
export class ProductPricingService {

    /**
     * productPricingListData
     * 
     * @type {ProductPricingList}
     * @memberOf ProductPricingService
     */
    public productPricingListData: ProductPricingList;

    /**
     * priceItEnumListData
     * 
     * @type {PriceItEnumListData[]}
     * @memberOf ProductPricingService
     */
    public priceItEnumListData: PriceItEnumListData[] = [];

    /**
     * selectedPriceList
     * 
     * @type {SelectedPriceList}
     * @memberOf ProductPricingService
     */
    public selectedPriceList: SelectedPriceList;
    /**
     * isPurchaseMarketValueCalculated
     * 
     * @type {boolean}
     * @memberOf ProductPricingService
     */
    public isPurchaseMarketValueCalculated: boolean;

    /**
     * isRateChanged
     * 
     * @type {boolean}
     * @memberOf ProductPricingService
     */
    public isRateChanged: boolean = false;

    /**
     * Creates an instance of DocumentUploadService.
     * 
     * @param {StearnsHttpClient} http
     * @param {AppSettings} appSettings
     * 
     * @memberOf DocumentUploadService
     */
    constructor(private http: StearnsHttpClient, private appSettings: AppSettings) {
        this.selectedPriceList = {
            ratesheet_col_desc: '',
            selected_price_list: ''
        };
    }


    /**
     * Get initial drop down values
     * 
     * @returns {Observable<PriceItEnumResponse>}
     * 
     * @memberOf ProductPricingService
     */
    getPriceItEnums(): Observable<PriceItEnumResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.lookupUrl + this.appSettings.serviceConfig.priceItEnumList;
        return this.http.get(serviceUrl)
            .map((response: Response) => <PriceItEnumResponse>response.json());
    }

    /**
     * Get Ratesheet API
     * 
     * @param {GetRateSheetRequest} request
     * @returns {Observable<RateSheetResponse>}
     * 
     * @memberOf ProductPricingService
     */
    getRatesheet(request: GetRateSheetRequest): Observable<RateSheetResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getRateSheet;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <RateSheetResponse>response.json();
                return data;
            });
    }

    /**
     * get enum list for price it screen
     * 
     * @returns {Observable<PriceItenumType>}
     * 
     * @memberOf ProductPricingService
     */
    getPriceItEnumType(): Observable<PriceItenumType> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.lookupUrl + this.appSettings.serviceConfig.priceItEnumType;
        return this.http.get(serviceUrl)
            .map((response: Response) => <PriceItenumType>response.json());
    }


    /**
     * Get price it API call
     * 
     * @param {GetPriceItRequest} request
     * @returns {Observable<PriceItResponse>}
     * 
     * @memberOf ProductPricingService
     */
    getPriceIt(request: GetPriceItRequest): Observable<PriceItResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getPriceIt;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <PriceItResponse>response.json();
                return data;
            });
    }

    /**
     * get adjustment API call
     * 
     * @param {GetPriceItRequest} request
     * @returns {Observable<PriceItAdjustmentsResponse>}
     * 
     * @memberOf ProductPricingService
     */
    getPriceItAdjustments(request: GetPriceItRequest): Observable<PriceItAdjustmentsResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getPriceItAdjustments;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <PriceItAdjustmentsResponse>response.json();
                return data;
            });
    }

    /**
     * Save scanario api
     * 
     * @param {SaveScenarioRequest} request
     * @returns {Observable<SaveScenarioResponse>}
     * 
     * @memberOf ProductPricingService
     */
    saveScenarios(price_quote_id: number, price_it_input: GetPriceItInput): Observable<SaveScenarioResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.saveScenario;
        return this.http.post(serviceUrl, {
            price_quote_id: price_quote_id,
            price_it_input: price_it_input
        }).map((response: Response) => {
            let data = <SaveScenarioResponse>response.json();
            return data;
        });
    }

    /**
     * Get scanario details api
     * 
     * @param {ScenarioDetailsRequest} request
     * @returns {Observable<ScenarioDetailsResponse>}
     * 
     * @memberOf ProductPricingService
     */
    getScenarioDetails(request: ScenarioDetailsRequest): Observable<ScenarioDetailsResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getScenarioDetails;
        return this.http.post(serviceUrl, request).map((response: Response) => {
            let data = <ScenarioDetailsResponse>response.json();
            return data;
        });
    }


    /**
     * Validate the zip code entered is valid or not
     * 
     * @param {string} zip
     * @returns {Observable<ZIpCodeResponse>}
     * 
     * @memberOf ProductPricingService
     */
    validateZIPCode(zip: string): Observable<ZIpCodeResponse> {
        let zipCode = JSON.stringify(zip);
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getZipCodeDetails;
        return this.http.post(serviceUrl, zipCode).map((response: Response) => {
            let data = <ZIpCodeResponse>response.json();
            return data;
        });
    }

    /**
     * Build the input for get price it and get adjustment
     * 
     * @returns {GetPriceItRequest}
     * 
     * @memberOf ProductPricingService
     */
    buildPriceItInputRequest(): GetPriceItRequest {
        let getPriceItInput: GetPriceItInput = new GetPriceItInput();
        let getPriceItRequest: GetPriceItRequest;
        if (!this.productPricingListData) { return null; }
        getPriceItInput.fico = this.productPricingListData.loanFICO.toString();
        getPriceItInput.amort_term = this.productPricingListData.amortTerm === 'Please Select' ? '' :
            this.productPricingListData.amortTerm.substring(0, 3);
        getPriceItInput.amort_type_arm = this.productPricingListData.amort_type_arm === true ? '1' : '0';
        getPriceItInput.amort_type_fixed = this.productPricingListData.amort_type_fixed === true ? '1' : '0';
        getPriceItInput.zip = this.productPricingListData.propertyZIP.toString();
        getPriceItInput.market_value = this.productPricingListData.purchaseMarketValue.toString();
        getPriceItInput.ltv = this.productPricingListData.ltv.toString();
        getPriceItInput.loan_amt = this.productPricingListData.loanAmount.toString();
        getPriceItInput.loan_purpose = this.productPricingListData.loanPurpose;
        getPriceItInput.prop_state = this.productPricingListData.propertyState;
        getPriceItInput.lock_term = this.productPricingListData.lockTerm.substring(0, 2);
        getPriceItInput.dti = this.productPricingListData.dti !== null ?
            this.productPricingListData.dti.toString() : '';
        getPriceItInput.prop_county = this.productPricingListData.country;
        getPriceItInput.cltv = this.productPricingListData.cltv !== null ?
            this.productPricingListData.cltv.toString() : '';
        getPriceItInput.aus_result = this.productPricingListData.ausResult === 'Please Select' ? '' : this.productPricingListData.ausResult;
        getPriceItInput.rate = this.productPricingListData.rate !== null ?
            this.productPricingListData.rate.toString() : '';
        getPriceItInput.loan_type_conv = this.productPricingListData.loan_type_conv === true ? '1' : '0';
        getPriceItInput.loan_type_fha = this.productPricingListData.loan_type_fha === true ? '1' : '0';
        getPriceItInput.loan_type_va = this.productPricingListData.loan_type_va === true ? '1' : '0';
        getPriceItInput.mortgage_ins = this.productPricingListData.mortgageInsurance;
        getPriceItInput.plan_id = '';
        getPriceItInput.loan_num = '';
        getPriceItInput.best_ex = this.productPricingListData.bestEx;
        getPriceItInput.exist_second = '';
        getPriceItInput.refi_has_imp = this.productPricingListData.stearnsFinancedRefi;
        getPriceItInput.last_name = '';
        getPriceItInput.first_name = '';
        getPriceItInput.fthb = this.productPricingListData.firstTimeHouseBuyer !== '2' ?
            this.productPricingListData.firstTimeHouseBuyer : '';
        getPriceItInput.occ = this.productPricingListData.occupacy;
        getPriceItInput.prop_type = this.productPricingListData.propertyType;
        getPriceItInput.impounds = this.productPricingListData.impounds;
        getPriceItInput.doc_type = this.productPricingListData.docType;
        getPriceItInput.citizen = this.productPricingListData.citizenship;
        getPriceItRequest = { price_it_input: getPriceItInput };
        return getPriceItRequest;
    }
}
