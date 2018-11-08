/**
 * ScenarioDetailsComponent component
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductPricingResource } from './../product-pricing.resource';
import { ProductPricingService } from './../product-pricing.service';
import { ScenarioDetailsData, ScenarioDetailsRequest, GetPriceItInput } from './../product-pricing.typedef';
import { Scenario } from './scenario-details.typedef';

declare var $: any;

@Component({
    selector: 'sl-scenario-details',
    templateUrl: './scenario-details.component.html',
    providers: []
})
export class ScenarioDetailsComponent implements OnInit {

    /**
     * priceQuoteId
     * 
     * @type {number}
     * @memberOf ScenarioDetailsComponent
     */
    priceQuoteId: number;
    /**
     * scenarioDetailsData
     * 
     * @type {ScenarioDetailsData}
     * @memberOf ScenarioDetailsComponent
     */
    scenarioDetailsData: ScenarioDetailsData;

    /**
     * getPriceItInput
     * 
     * @type {GetPriceItInput}
     * @memberOf ScenarioDetailsComponent
     */
    getPriceItInput: GetPriceItInput;

    /**
     * scenario
     * 
     * @type {Scenario}
     * @memberOf ScenarioDetailsComponent
     */
    scenario: Scenario;

    /**
    * @type {{ [key: string]: string }}
    * @memberOf ScenarioDetailsComponent
    */
    resource: { [key: string]: string } = ProductPricingResource.scenarioDetails;

    /**
     * Creates an instance of ScenarioDetailsComponent.
     * @param {ProductPricingService} productPricingService
     * @memberOf ScenarioDetailsComponent
     */
    constructor(private productPricingService: ProductPricingService, private router: Router, private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let request: ScenarioDetailsRequest;
        this.priceQuoteId = this.activeRoute.snapshot.params['priceQuoteId'];
        let borrowerName: string = decodeURIComponent(this.activeRoute.snapshot.params['borrowerName']);
        request = {
            borrower_name: borrowerName,
            page_number: 0,
            page_size: 100,
            price_quote_id: this.priceQuoteId
        };
        this.productPricingService.getScenarioDetails(request)
            .subscribe(items => {
                this.scenarioDetailsData = items.data;
                this.getPriceItInput = items.data.price_it_input;
                this.scenario = items.data.price_quote_details;
            });
    }

    addAnotherScenario() {
        if (this.scenario) {
            this.productPricingService.productPricingListData = {
                loanFICO: Number(this.getPriceItInput.fico),
                propertyZIP: Number(this.getPriceItInput.zip),
                purchaseMarketValue: Number(this.getPriceItInput.market_value),
                ltv: Number(this.getPriceItInput.ltv),
                loanAmount: Number(this.getPriceItInput.loan_amt),
                loanPurpose: this.getPriceItInput.loan_purpose,
                occupacy: this.getPriceItInput.occ,
                propertyType: this.getPriceItInput.prop_type,
                impounds: this.getPriceItInput.impounds !== '' ? this.getPriceItInput.impounds : 'Impounds',
                lockTerm: this.getPriceItInput.lock_term,
                rate: Number(this.getPriceItInput.rate),
                bestEx: this.getPriceItInput.best_ex === 'True' ? '1' : '0',
                amort_type_arm: this.getPriceItInput.amort_type_arm === '1' ? true : false,
                amort_type_fixed: this.getPriceItInput.amort_type_fixed === '1' ? true : false,
                amortTerm: this.getPriceItInput.amort_term === '' ? 'Please Select' : this.getPriceItInput.amort_term,
                loan_type_conv: this.getPriceItInput.loan_type_conv === '1' ? true : false,
                loan_type_fha: this.getPriceItInput.loan_type_fha === '1' ? true : false,
                loan_type_va: this.getPriceItInput.loan_type_va === '1' ? true : false,
                docType: this.getPriceItInput.doc_type,
                propertyState: this.getPriceItInput.prop_state,
                country: this.getPriceItInput.prop_county,
                citizenship: this.getPriceItInput.citizen,
                existigNewTD: Number(this.getPriceItInput.exist_second),
                stearnsFinancedRefi: this.getPriceItInput.refi_has_imp,
                totatEstQMFees: null,
                cltv: Number(this.getPriceItInput.cltv),
                ausResult: this.getPriceItInput.aus_result !== '' ? this.getPriceItInput.aus_result : 'Please Select',
                mortgageInsurance: this.getPriceItInput.mortgage_ins,
                dti: Number(this.getPriceItInput.dti),
                firstTimeHouseBuyer: this.getPriceItInput.fthb !== '' ?
                    (this.getPriceItInput.fthb === 'True' ? '1' : '0') : 'Please Select',
                priceQuoteId: this.priceQuoteId,
                firstName: this.scenarioDetailsData.price_it_input.first_name,
                lastName: this.scenarioDetailsData.price_it_input.last_name
            };
            this.router.navigate(['/pricing/price-it']);
        }
    }

    navigateToDashboard(): void {
        this.router.navigate(['/dashboard/scenario-pipeline']);
    }

    /**
     * Close accordian on the page redirection
     * 
     * 
     * @memberOf ScenarioDetailsComponent
     */
    closeAccordian() {
        let $myGroup = $('#scenario-accordion');
        $myGroup.on('show.bs.collapse', '.collapse', function () {
            $myGroup.find('.collapse.in').collapse('hide');
        });
    }
}

