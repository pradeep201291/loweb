import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MessagePage } from './message.page';
import { MessageRoutingModule } from './message-routing.module';

import { MessageService } from './shared/message-page.service';
import { SharedModule } from './../shared/shared.module';

import { ContactListComponent } from './contact-list/contact-list.component';
import { MessageWindowComponent } from './message-window/message-window.component';
import { FilterContact } from './message-window/filter-contact.pipe';
import { DateFormatPipe } from './shared/message-dateformat.pipe';
import { SortPipe } from './shared/message-sort.pipe';
/**
 * 
 * @export
 * @class MessageModule
 */
@NgModule({
  imports: [BrowserModule, FormsModule, MessageRoutingModule, SharedModule],
  declarations: [ MessagePage, ContactListComponent, MessageWindowComponent,
   FilterContact, DateFormatPipe, SortPipe],
  exports: [MessagePage],
  entryComponents: [MessagePage],
  providers: [MessageService],
})
export class MessageModule { }
