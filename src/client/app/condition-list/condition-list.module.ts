import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { ConditionListPage } from './condition-list.page';
import { ConditionListRoutingModule } from './condition-list-routing.module';
import { ConditionListService } from './condition-list.service';


@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule, SharedModule, ConditionListRoutingModule],
  declarations: [ConditionListPage],
  providers: [ConditionListService],
})
export class ConditionListModule {


}



