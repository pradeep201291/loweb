/**
 * EligibleProductListComponent component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProductPricingResource } from './../product-pricing.resource';
import { EligibleProduct, SaveSenario } from './eligible-product-list.typedef';
import { ProductPricingService } from '../product-pricing.service';
import { GetPriceItRequest, AdjustmentsData } from '../product-pricing.typedef';
import * as _ from 'lodash';

declare var $: any;

@Component({
    selector: 'sl-eligible-product-list',
    templateUrl: './eligible-product-list.component.html',
    providers: []
})
export class EligibleProductListComponent {

    /**
     * loading
     * 
     * @type {boolean}
     * @memberOf EligibleProductListComponent
     */
    loading: boolean = false;

    /**
     * saveSenario
     * 
     * @type {SaveSenario}
     * @memberOf EligibleProductListComponent
     */
    saveSenario: SaveSenario;

    /**
     * saveScenarioResponse
     * 
     * @type {string}
     * @memberOf EligibleProductListComponent
     */
    saveScenarioResponse: string = '';

    /**
     * @type {{ [key: string]: string }}
     * @memberOf EligibleProductListComponent
     */
    resource: { [key: string]: string } = ProductPricingResource.eligibleProductList;

    /**
     * 
     * 
     * @type {EligibleProduct[]}
     * @memberOf EligibleProductListComponent
     */
    products: EligibleProduct[] = [];

    /**
     * saveProduct
     * 
     * @type {EligibleProduct}
     * @memberOf EligibleProductListComponent
     */
    saveProduct: EligibleProduct;

    /**
     * firstNameReq
     * 
     * @type {boolean}
     * @memberOf EligibleProductListComponent
     */
    firstNameReq: boolean = false;

    /**
     * lastNameReq
     * 
     * @type {boolean}
     * @memberOf EligibleProductListComponent
     */
    lastNameReq: boolean = false;


    adjustmentsData: AdjustmentsData;

    product: EligibleProduct;

    sortBy: string = '';

    sortOrder: string = '';

    isResponse: boolean = false;

    /**
     * 
     * Get input for eligibleProducts and filter the data
     * 
     * @memberOf EligibleProductListComponent
     */
    @Input() set eligibleProducts(value: EligibleProduct[]) {
        this.isResponse = false;
        if (value) {
            this.isResponse = true;
            this.products = value;
            this.products.filter(e => e.lender_price).map(e => e.discountPoints = 100 - e.lender_price);
            this.products.filter(e => (e.discountPoints).toString().includes('-')).map(e => {
                e.isDiscountPointsNegative = true;
                let roundDecimal = Number((e.discountPoints).toString().substring(1, 15)).toFixed(4);
                e.discountPoints = Number(roundDecimal);
            });
            this.products.filter(e => e.isDiscountPointsNegative !== true).map(e => {
                e.isDiscountPointsNegative = false;
                let roundDecimal = Number((e.discountPoints).toString()).toFixed(4);
                e.discountPoints = Number(roundDecimal);
            });


            this.products.filter(e => e.loan_amt).map(e => e.discountAmount = e.loan_amt * (100 - e.lender_price) / 100);
            this.products.filter(e => (e.discountAmount).toString().includes('-')).map(e => {
                e.isDiscountAmountNegative = true;
                let roundDecimal = Number((e.discountAmount).toString().substring(1, 15)).toFixed(2);
                e.discountAmount = Number(roundDecimal);
            });
            this.products.filter(e => e.isDiscountAmountNegative !== true).map(e => {
                e.isDiscountAmountNegative = false;
                let roundDecimal = Number((e.discountAmount).toString()).toFixed(2);
                e.discountAmount = Number(roundDecimal);
            });

        }
    }
    /**
     * 
     * output for selectedProduct
     * 
     * @memberOf EligibleProductListComponent
     */
    @Input() priceQuoteId: number;

    /**
     * 
     * output for selectedProduct
     * 
     * @memberOf EligibleProductListComponent
     */
    @Output() onProductSelected = new EventEmitter<EligibleProduct>();

    /**
     * Creates an instance of EligibleProductListComponent.
     * 
     * @memberOf EligibleProductListComponent
     */
    constructor(private productPricingService: ProductPricingService, private router: Router) {
        this.saveSenarioInit();
    }

    /** 
      * load the adjustments data
      * 
      * @memberOf EligibleProductListComponent
      */
    selectProduct(selectedProduct: EligibleProduct) {
        this.onProductSelected.emit(selectedProduct);
    }
    /**
      * load the adjustments data
      * 
      * 
      * @memberOf EligibleProductListComponent
      */
    loadAdjustments(product: EligibleProduct) {
        let $myGroup = $('#accordion');
        $myGroup.on('show.bs.collapse', '.collapse', function () {
            $myGroup.find('.collapse.in').collapse('hide');
        });
        this.adjustmentsData = null;
        this.product = product;
        this.saveScenarioResponse = '';
        this.loading = true;
        let getPriceAdjustmentRequest = this.productPricingService.buildPriceItInputRequest();
        getPriceAdjustmentRequest.price_it_input.plan_id = product.plan_id.toString();
        this.productPricingService.getPriceItAdjustments(getPriceAdjustmentRequest)
            .subscribe(items => {
                this.loading = false;
                this.adjustmentsData = items.data;
            });
    }

    /**
     * load the product data for save 
     * 
     * @param {EligibleProduct} product
     * 
     * @memberOf EligibleProductListComponent
     */
    validateAndSaveScenario(product: EligibleProduct): void {
        this.saveProduct = product;
        if (this.priceQuoteId > 0) {
            this.saveSenario.first_name = this.productPricingService.productPricingListData.firstName;
            this.saveSenario.last_name = this.productPricingService.productPricingListData.lastName;
            this.saveScenario();
        } else {
            $('#save-scenario-modal').modal('show');
            this.saveScenarioResponse = '';
        }
    }

    /**
     * Save Price Quote
     * 
     * 
     * @memberOf EligibleProductListComponent
     */
    validateAndSave() {
        this.saveSenario.first_name && this.saveSenario.first_name !== null ?
            this.firstNameReq = false : this.firstNameReq = true;
        this.saveSenario.last_name && this.saveSenario.last_name !== null ?
            this.lastNameReq = false : this.lastNameReq = true;
        if (this.firstNameReq === false && this.lastNameReq === false) {
            this.saveScenario();
        } else {
            return false;
        }
    }

    /**
     * 
     * saveSenario Initializing data
     * 
     * @memberOf EligibleProductListComponent
     */
    saveSenarioInit() {
        let priceItInput: GetPriceItRequest = this.productPricingService.buildPriceItInputRequest();
        if (priceItInput) {
            this.saveSenario = {
                first_name: priceItInput.price_it_input.first_name,
                last_name: priceItInput.price_it_input.last_name
            };
        }
    }

    /**
     * Save the price and redirect to scenario in dashboard page.
     * 
     * 
     * @memberOf EligibleProductListComponent
     */
    saveScenario() {
        if (this.saveSenario) {
            let getPriceAdjustmentRequest = this.productPricingService.buildPriceItInputRequest();
            getPriceAdjustmentRequest.price_it_input.plan_id = this.saveProduct.plan_id.toString();
            getPriceAdjustmentRequest.price_it_input.first_name = this.saveSenario.first_name;
            getPriceAdjustmentRequest.price_it_input.last_name = this.saveSenario.last_name;
            this.productPricingService.saveScenarios(this.priceQuoteId, getPriceAdjustmentRequest.price_it_input)
                .subscribe(items => {
                    this.saveScenarioResponse = items.data;
                    $('#save-scenario-modal').modal('hide');
                    if ($('.modal-backdrop.in').is(':visible')) {
                        $('.modal-backdrop.in').hide();
                    }
                    if (this.saveScenarioResponse === 'Your Price Quote has been saved.') {
                        this.productPricingService.productPricingListData = null;
                        this.productPricingService.isPurchaseMarketValueCalculated = false;
                        this.router.navigate(['/dashboard/scenario-pipeline']);
                    } else {
                        this.saveScenarioResponse = 'Failed';
                    }
                });
        }
    }


    sortEligibleProduct(sortBy: string, sortOrder: string) {
        this.sortOrder = sortOrder;
        this.sortBy = sortBy;
        if (sortBy === 'product_name') {
            this.products = _.orderBy(this.products, [(e) => e.product_name.toLowerCase()], [sortOrder]);
        } else if (sortBy === 'rate') {
            this.products = _.orderBy(this.products, [(e) => e.rate], [sortOrder]);
        } else if (sortBy === 'payment') {
            this.products = _.orderBy(this.products, [(e) => e.payment], [sortOrder]);
        }
    }

    ngOnDestroy() {
        if ($('.modal-backdrop.in').is(':visible')) {
            $('.modal-backdrop.in').hide();
        }
    }

    onLastName() {
        this.lastNameReq = false;
    }

    onFirstName() {
        this.firstNameReq = false;
    }
}

