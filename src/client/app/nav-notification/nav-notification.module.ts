import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { NavNotificationPage } from './nav-notification.page';
import { NavNotificationRoutingModule} from './nav-notification-routing.module';
import { NotificationService } from '../notification/notification.service';
import { DateFormatPipe } from './notification.dateformat.pipe';

@NgModule({
  imports: [ HttpModule, BrowserModule, FormsModule, SharedModule, NavNotificationRoutingModule ],
  declarations: [ NavNotificationPage, DateFormatPipe],
  providers: [NotificationService],
})
export class NavNotificationModule {
}



