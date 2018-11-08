import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfrastructureModule } from './../infrastructure/infrastructure.module';

import { AnnouncementComponent } from './announcement/announcement.component';
import { StearnsHttpClient } from './../infrastructure/http-client/http-client.service';


@NgModule({
  imports: [BrowserModule, InfrastructureModule],
  declarations: [AnnouncementComponent],
  exports: [AnnouncementComponent],
  providers: [StearnsHttpClient]
})
export class CommunicationModule { }
