import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DocumentPage } from './documents.page';
import { DocumentRoutingModule } from './documents-routing.module';
import { DocumentService } from './documents.service';
import { ViewDocumentPage } from './view-documents/view-documents.component';
import { UploadDocumentPage } from './upload-documents/upload-documents.component';
import { SharedModule } from './../shared/shared.module';
import { UTCDatePipe } from './view-documents/view-documents.datepipe';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [HttpModule, BrowserModule, FormsModule, DocumentRoutingModule, SharedModule],
  declarations: [DocumentPage, ViewDocumentPage, UploadDocumentPage, UTCDatePipe, PdfViewerComponent],
  providers: [DocumentService],
})
export class DocumentModule {


}



