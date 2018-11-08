import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { PipelinePage } from './../pipeline/pipeline.page';
import { PipelineRoutingModule } from './pipeline-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PipeLineService } from './pipeline.service';

@NgModule({
  imports: [HttpModule, BrowserModule, PipelineRoutingModule, SharedModule],
  declarations: [PipelinePage],
  exports: [PipelinePage],
  providers: [PipeLineService]
})
export class PipelineModule { }
