import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ProductPricingPage } from './product-pricing.page';
import { ProductPricingRoutingModule } from './product-pricing-routing.module';
import { PricingResultsComponent } from './pricing-results/pricing-results.component';
import { PricingEngineComponent } from './pricing-engine/pricing-engine.component';
import { ProductPricingService } from './product-pricing.service';
import { RateSheetComponent } from './rate-sheet/rate-sheet.component';
import { PriceListComponent } from './price-list/price-list.component';
import { EligibleProductListComponent } from './eligible-product-list/eligible-product-list.component';
import { InEligibleProductListComponent } from './in-eligible-product-list/in-eligible-product-list.component';
import { PriceAdjustmentsComponent } from './price-adjustments/price-adjustments.component';
import { ScenarioDetailsComponent } from './scenario-details/scenario-details.component';
import { MinusConversion } from './rate-sheet/rate-sheet.minusConversionPipe';

@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule, ProductPricingRoutingModule],
  declarations: [ProductPricingPage, PricingResultsComponent, PricingEngineComponent,
    RateSheetComponent, PriceListComponent, EligibleProductListComponent, InEligibleProductListComponent,
    PriceAdjustmentsComponent, ScenarioDetailsComponent, MinusConversion],
  providers: [ProductPricingService],
  exports: [PriceAdjustmentsComponent, RateSheetComponent]
})
export class ProductPricingModule {
}



