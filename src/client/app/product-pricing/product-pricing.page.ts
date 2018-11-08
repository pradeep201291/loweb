
import { Component } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import { ProductPricingService } from './product-pricing.service';
import { EnumtypeList, PriceItEnumListData } from './product-pricing.typedef';
declare var $: any;

@Component({
    selector: 'sl-product-pricing',
    templateUrl: './product-pricing.page.html',
    providers: []
})
export class ProductPricingPage {

    productpriceEnumTypes: EnumtypeList;
    productPriceEnumList: PriceItEnumListData[] = [];

    constructor(private productPricingService: ProductPricingService) {
    }

    /**
     * 
     * 
     * 
     * @memberOf ProductPricingPage
     */
    ngOnInit() {
        this.productPricingService.getPriceItEnums()
            .subscribe(items => {
                this.productPriceEnumList = items.data;
            });
    }
}
