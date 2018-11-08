/**
 * RateList component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PriceList, SelectedPriceList } from './price-list.typedef';
import { ProductPricingService } from '../product-pricing.service';

@Component({
    selector: 'sl-price-list',
    templateUrl: './price-list.component.html',
    providers: []
})
export class PriceListComponent {

    @Input() priceList: PriceList;

    /**
     * selectedPriceList
     * 
     * @type {SelectedPriceList}
     * @memberOf PriceListComponent
     */
    selectedPriceList: SelectedPriceList;

    /**
     * selectedPrice
     * 
     * @type {string}
     * @memberOf PriceListComponent
     */
    selectedPrice: string;

    @Output() onRateSelected = new EventEmitter<SelectedPriceList>();

    /**
     * selectedColumn
     * 
     * @type {string}
     * @memberOf PriceListComponent
     */
    selectedColumn: string;

    constructor(private productPricingService: ProductPricingService) {
        this.productPricingService.selectedPriceList = {
            ratesheet_col_desc: '',
            selected_price_list: ''
        };
    }

    /**
     * stroing the column description selected rate inservice file so it can be used while making the API calls in pricing-result component
     * 
     * @param {string} price
     * @param {string} column
     * 
     * @memberOf PriceListComponent
     */
    selectedRate(price: string, column: string, description: string, id: number) {
        this.selectedPriceList.selected_price_list = price;
        this.selectedPriceList.ratesheet_col_desc = description;
        this.selectedPriceList.id = id;
        this.onRateSelected.emit(this.selectedPriceList);
        this.productPricingService.selectedPriceList.selected_price_list = price;
        this.productPricingService.selectedPriceList.ratesheet_col_desc = column;
    }
}

