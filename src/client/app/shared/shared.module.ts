import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { LoanHeaderComponent } from './loan-header/loan.header.component';
import { DashboardDataService } from './dashboard.data.service';
import { FileDropZoneComponent } from './file-dropzone/file-dropzone.component';

@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule],
  declarations: [LoanHeaderComponent, FileDropZoneComponent],
  exports: [LoanHeaderComponent, FileDropZoneComponent],
  providers: [DashboardDataService]
})
export class SharedModule { }
