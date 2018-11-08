import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressBarService } from './progress-bar/progress-bar.service';
import { StearnsHttpClient } from './http-client/http-client.service';
import { PagerService } from './pagination/pagination.service';
import { DataStoreService } from './data-store/data-store.service';
import { InteractionService } from './interaction.service';
/*
** This module is used for the progress bar functionality on all pages 
*/
@NgModule(
    {
        imports: [HttpModule, BrowserModule, FormsModule],
        declarations: [ProgressBarComponent],
        providers: [ProgressBarService, StearnsHttpClient, PagerService, DataStoreService, InteractionService],
        exports: [ProgressBarComponent]
    }
)
/*
**
*/
export class InfrastructureModule { }
