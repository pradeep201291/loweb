/**
 * PriceAdjustmentsComponent component
 */
import { Component, Input } from '@angular/core';

import { ProductPricingResource } from './../product-pricing.resource';
import { AdjustmentsData } from '../product-pricing.typedef';
import { Adjustment } from './price-adjustments.typedef';
import { EligibleProduct } from '../eligible-product-list/eligible-product-list.typedef';

@Component({
    selector: 'sl-price-adjustments',
    templateUrl: './price-adjustments.component.html',
    providers: []
})
export class PriceAdjustmentsComponent {
    /**
     * 
     * 
     * @type {{ [key: string]: string }}
     * @memberOf PriceAdjustmentsComponent
     */
    resource: { [key: string]: string } = ProductPricingResource.priceAdjustments;

    /**
     * adjustmentData
     * 
     * @type {Adjustment[]}
     * @memberOf PriceAdjustmentsComponent
     */
    adjustmentData: AdjustmentsData;

    /**
     * adjustment
     * 
     * @type {Adjustment[]}
     * @memberOf PriceAdjustmentsComponent
     */
    adjustment: Adjustment[];

    /**
     * discountPonts
     * 
     * @type {number}
     * @memberOf PriceAdjustmentsComponent
     */
    @Input() discountPonts: number;

    /**
     * 
     * 
     * @type {number}
     * @memberOf PriceAdjustmentsComponent
     */
    netPricingAdjustment: number;

    /**
     * isNetPricingAdjustmentNegative
     * 
     * @type {boolean}
     * @memberOf PriceAdjustmentsComponent
     */
    isNetPricingAdjustmentNegative: boolean = false;


    /**
     * isBasePriceNegative
     * 
     * @type {boolean}
     * @memberOf PriceAdjustmentsComponent
     */
    isBasePriceNegative: boolean = false;

    /**
     * basePrice
     * 
     * @type {number}
     * @memberOf PriceAdjustmentsComponent
     */
    basePrice: number;

    /**
     * products
     * 
     * @type {EligibleProduct}
     * @memberOf PriceAdjustmentsComponent
     */
    products: EligibleProduct;

    productName: string;
    productRate: string;
    productPrice: string;
    isDiscountPointsNegative: boolean = false;



    /**
     * Get Adjustment data and filter the price
     * 
     * 
     * @memberOf PriceAdjustmentsComponent
     */
    @Input() set adjustments(value: AdjustmentsData) {
        if (value) {
            this.adjustmentData = value;
            this.adjustment = value.adjustments;
            this.adjustmentData.adjustments.filter(e => e.isAmountNegative = false);
            this.adjustment.filter(e => e.amount.toString().includes('-')).map(e => {
                e.isAmountNegative = true;
                let roundDecimal = Number((e.amount).toString().substring(1, 15)).toFixed(4);
                e.amount = Number(roundDecimal);
            });
            this.basePrice = this.adjustmentData.base_price;
            if (this.adjustmentData.base_price.toString().includes('-')) {
                this.isBasePriceNegative = true;
                let roundDecimal = Number(this.adjustmentData.base_price.toString().substring(1, 15)).toFixed(4);
                this.basePrice = Number(roundDecimal);
            }
            this.netPricingAdjustment = this.adjustmentData.final_prices;
            if (this.netPricingAdjustment.toString().includes('-')) {
                this.isNetPricingAdjustmentNegative = true;
                let roundDecimal = Number(this.adjustmentData.final_prices.toString().substring(1, 15)).toFixed(4);
                this.netPricingAdjustment = Number(roundDecimal);
            }
        }
    }

    @Input() set productDetails(value: EligibleProduct) {
        if (value) {
            this.productName = value.product_name;
            this.productRate = value.rate.toString();
            this.productPrice = Number(100 - value.lender_price).toFixed(4);
            if (this.productPrice.toString().includes('-')) {
                this.isDiscountPointsNegative = true;
                let roundDecimal = Number((this.productPrice).toString().substring(1, 15)).toFixed(4);
                this.productPrice = roundDecimal;
            }
        }
    }
}
