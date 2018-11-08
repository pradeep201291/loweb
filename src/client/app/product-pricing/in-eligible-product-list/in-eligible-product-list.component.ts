/**
 * InEligibleProductListComponent component
 */
import { Component, Input, OnInit } from '@angular/core';

import { ProductPricingResource } from './../product-pricing.resource';
import { InEligibleProduct } from './in-eligible-product-list.typedef';

@Component({
    selector: 'sl-ineligible-product-list',
    templateUrl: './in-eligible-product-list.component.html',
    providers: []
})
export class InEligibleProductListComponent implements OnInit {
    resource: { [key: string]: string } = ProductPricingResource.inEligibleProductList;
    @Input() products: InEligibleProduct[];

    ngOnInit(): void {

    }
}

