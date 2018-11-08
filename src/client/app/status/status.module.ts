import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { StatusPage } from './../status/status.page';
import { StatusRoutingModule } from './status-routing.module';
import { StatusKeyDatesComponent } from './../status/key-dates/key-dates.component';
import { StatusMajorEventsComponent } from './../status/major-events/major-events.component';
import { StatusProgressComponent } from './../status/progress/progress.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule, StatusRoutingModule, SharedModule],
  declarations: [StatusPage, StatusKeyDatesComponent, StatusMajorEventsComponent, StatusProgressComponent],
  exports: [StatusPage],
  providers: []
})
export class StatusModule { }
