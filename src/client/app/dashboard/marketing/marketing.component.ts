import { Component, OnInit } from '@angular/core';
import { MarketingService } from './marketing.service';
import { MarketingResponse } from './marketing.model';


/**
 * This is the Marketing Component.
 */
@Component({
    selector: 'sl-marketing',
    templateUrl: './marketing.component.html'
})


export class MarketingComponent implements OnInit {

    MarketingDetails: MarketingResponse[];
    constructor(private marketingService: MarketingService) { }

    ngOnInit() {
        this.getMarketingDetails();
    }

    getMarketingDetails() {
        this.marketingService.getMarketingDetailsfromApi()
            .subscribe(items => {
                this.MarketingDetails = items.data;
            });
    }

}
