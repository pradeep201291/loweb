/**
 * RateSheetComponent component
 */
import { Component, Input } from '@angular/core';

import { PriceList } from './../price-list/price-list.typedef';
import { SelectedPriceList } from '../price-list/price-list.typedef';
import { ProductPricingService } from '../product-pricing.service';
import { EligibleProduct } from '../product-pricing.typedef';

@Component({
    selector: 'sl-rate-sheet',
    templateUrl: './rate-sheet.component.html',
    providers: []
})
export class RateSheetComponent {

    /**
     * isFirstSectionSelected
     * 
     * @type {boolean}
     * @memberOf RateSheetComponent
     */
    isFirstSectionSelected: boolean = true;


    /**
     * isSecondSectionSelected
     * 
     * @type {boolean}
     * @memberOf RateSheetComponent
     */
    isSecondSectionSelected: boolean = false;

    /**
     * selectedPriceList
     * 
     * @type {SelectedPriceList}
     * @memberOf RateSheetComponent
     */
    selectedPriceList: SelectedPriceList;

    /**
     * rateSheetData
     * 
     * @type {PriceList[]}
     * @memberOf RateSheetComponent
     */
    rateSheetData: PriceList[];


    /**
     * 
     * 
     * 
     * @memberOf RateSheetComponent
     */
    @Input() set rateSheet(value: PriceList[]) {
        if (value) {
            this.rateSheetData = value;
            let rateColumns = this.rateSheetData.filter(e => e.ratesheet_col_desc === this.selectedPriceList.ratesheet_col_desc);
            let number = Number(Number(this.selectedPriceList.selected_price_list).toFixed(3));
            this.selectedPriceList.id = Number(rateColumns[0].price_list.indexOf(number));
        }

    }

    @Input() set selectedProduct(value: EligibleProduct) {
        if (value) {
            this.selectedPriceList.selected_price_list = (100 - value.lender_price).toString();
            this.selectedPriceList.ratesheet_col_desc = value.term + ' Days';
        }
    }

    // /**
    //  * 
    //  * 
    //  * @readonly
    //  * @type {PriceList[]}
    //  * @memberOf RateSheetComponent
    //  */
    // get rateSheet(): PriceList[] {
    //     return this.rateSheetData;
    // }

    /**
     * Creates an instance of RateSheetComponent.
     * 
     * @param {ProductPricingService} productPricingService
     * 
     * @memberOf RateSheetComponent
     */
    constructor(private productPricingService: ProductPricingService) {
        this.selectedPriceList = {
            ratesheet_col_desc: '',
            selected_price_list: ''
        };
    }

    /**
     * Toggle tab selection
     * 
     * @param {string} selectedTab
     * 
     * @memberOf RateSheetComponent
     */
    toggleTabSelection(selectedTab: string): void {
        if (selectedTab === 'first') {
            this.isFirstSectionSelected = true;
            this.isSecondSectionSelected = false;
        } else {
            this.isFirstSectionSelected = false;
            this.isSecondSectionSelected = true;
        }
    }

    /**
     * Stores the value for API call and gighlight the selected value
     * 
     * @param {string} price
     * @param {string} column
     * @param {string} description
     * @param {number} id
     * 
     * @memberOf RateSheetComponent
     */
    selectedRate(price: string, column: string, description: string, id: number) {
        if (description !== 'RATE') {
            this.productPricingService.isRateChanged = true;
            this.selectedPriceList.selected_price_list = price;
            this.selectedPriceList.ratesheet_col_desc = description;
            this.selectedPriceList.id = id;
            let rateColumns = this.rateSheetData.filter(e => (e.ratesheet_col_desc === 'RATE'));
            this.productPricingService.selectedPriceList.selected_price_list = (rateColumns[0].price_list[id]).toString();
            this.productPricingService.selectedPriceList.ratesheet_col_desc = column;
        }
    }

}

