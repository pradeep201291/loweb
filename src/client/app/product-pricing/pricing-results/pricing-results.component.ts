/**
 *  PricingResultsComponent component
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductPricingResource } from './../product-pricing.resource';
import { ProductPricingService } from '../product-pricing.service';
import { PriceList } from './../price-list/price-list.typedef';
import { GetPriceItInput, EligibleProduct, IneligibleProduct } from '../product-pricing.typedef';
import { SelectedPriceList } from '../price-list/price-list.typedef';

@Component({
    selector: 'sl-pricing-results',
    templateUrl: './pricing-results.component.html',
    providers: []
})
export class PricingResultsComponent implements OnInit {
    resource: { [key: string]: string } = ProductPricingResource.pricingResults;

    /**
     * @type {boolean}
     * @memberOf PricingResultsComponent
     */
    isEligibleProductSelected: boolean = true;

    /**
     * selectedPriceList
     * 
     * @type {SelectedPriceList}
     * @memberOf PricingResultsComponent
     */
    selectedPriceList: SelectedPriceList;

    /**
     * @type {boolean}
     * @memberOf PricingResultsComponent
     */
    isInEligibleProductSelected: boolean = false;

    /**
     * @type {EligibleProduct}
     * @memberOf PricingResultsComponent
     */
    selectedProduct: EligibleProduct;
    eligibleProductsData: EligibleProduct[];
    ineligibleProductsData: IneligibleProduct[];
    getPriceItInput: GetPriceItInput;
    activeRatesheet: PriceList[];
    priceQuoteId: number;
    /**
     * Creates an instance of PricingResultsComponent.
     * 
     * @param {Router} router
     * 
     * @memberOf PricingResultsComponent
     */
    constructor(private router: Router, private productPricingService: ProductPricingService) {
    }

    ngOnInit() {
        if (!this.productPricingService.productPricingListData) {
            this.router.navigate(['/pricing/price-it']);
            return;
        }
        this.priceQuoteId = this.productPricingService.productPricingListData.priceQuoteId;
        this.productPricingService.getPriceIt(this.productPricingService.buildPriceItInputRequest())
            .subscribe(items => {
                this.eligibleProductsData = items.data.eligible_products;

                this.ineligibleProductsData = items.data.ineligible_products;
            });
    }
    /**
     * Toggle tab selection
     * 
     * @param {string} selectedTab
     * 
     * @memberOf PricingResultsComponent
     */
    toggleTabSelection(selectedTab: string): void {

        if (selectedTab === 'eligible') {
            this.isEligibleProductSelected = true;
            this.isInEligibleProductSelected = false;
        } else {
            this.isEligibleProductSelected = false;
            this.isInEligibleProductSelected = true;
        }
    }

    /**
     * When the reprice button is clicked, navigate to pricing engine
     * 
     * @memberOf PricingResultsComponent
     */
    reprice(): void {
        this.router.navigate(['/pricing/price-it']);
    }
    /**
     * 
     * 
     * @memberOf PricingResultsComponent
     */
    onProductSelected(product: EligibleProduct) {
        this.activeRatesheet = null;
        this.selectedProduct = product;
        let request = this.productPricingService.buildPriceItInputRequest();
        request.price_it_input.plan_id = product.plan_id.toString();
        request.price_it_input.rate = product.rate.toString();
        this.productPricingService.getRatesheet(request)
            .subscribe(items => {
                this.activeRatesheet = items.data.ratesheet;
            });
    }

    /**
     * Get the enum.v of selected dropdown value
     * 
     * @param {string} type
     * @param {string} selectedValue
     * @returns {string}
     * 
     * @memberOf PricingResultsComponent
     */
    getValue(type: string, selectedValue: string): string {
        let data = this.productPricingService.priceItEnumListData.filter(e => e.property_name === type);
        let id = data[0].enums.filter(e => e.t === selectedValue);
        return id[0].v;
    }

    /**
     * Call API and get new eligible list taking the selected rate stored from the service
     * 
     * 
     * @memberOf PricingResultsComponent
     */
    getNewPriceIt() {
        if (this.productPricingService.isRateChanged) {
            this.productPricingService.isRateChanged = false;
            let request = this.productPricingService.buildPriceItInputRequest();
            request.price_it_input.plan_id = this.selectedProduct.plan_id.toString();
            if (this.productPricingService.selectedPriceList) {
                request.price_it_input.rate = this.productPricingService.selectedPriceList.selected_price_list.toString();
                request.price_it_input.lock_term = this.productPricingService.selectedPriceList.ratesheet_col_desc.toString();
                this.productPricingService.getPriceIt(request)
                    .subscribe(items => {
                        this.eligibleProductsData = items.data.eligible_products;
                        if (items.data.eligible_products && items.data.eligible_products.length === 0) {
                            this.isEligibleProductSelected = false;
                            this.isInEligibleProductSelected = true;
                        }
                        this.ineligibleProductsData = items.data.ineligible_products;
                        this.productPricingService.productPricingListData.rate = Number(request.price_it_input.rate);
                        this.productPricingService.productPricingListData.lockTerm = request.price_it_input.lock_term;
                    });
            }
        }
    }
}
