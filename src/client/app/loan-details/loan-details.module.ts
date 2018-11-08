import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LoanDetailService } from './loan-details.service';
import { SharedModule } from './../shared/shared.module';
import { LoanDetailsRoutingModule } from './loan-details-routing.module';
import { LoanDetailsPage } from './loan-details.page';
import { ProductPricingModule } from './../product-pricing/product-pricing.module';

@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule, SharedModule, LoanDetailsRoutingModule,
    ProductPricingModule],
  declarations: [LoanDetailsPage],
  providers: [LoanDetailService]
})
export class LoanDetailsModule { }
