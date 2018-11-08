import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { NotificationPage } from './notification.page';
import { NotificationRoutingModule} from './notification-routing.module';
import { NotificationService } from './notification.service';
import { DateFormatPipe } from './notification.dateformat.pipe';

@NgModule({
  imports: [ HttpModule, BrowserModule, FormsModule, SharedModule, NotificationRoutingModule ],
  declarations: [ NotificationPage, DateFormatPipe],
  providers: [NotificationService],
})
export class NotificationModule {
}



