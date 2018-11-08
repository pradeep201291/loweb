import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DashBoardPage } from './dashboard.page';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProgressTrackComponent } from './progress-track/progress-track.component';
import { MarketingComponent } from './marketing/marketing.component';
import { LoanInformationComponent } from './loan-Info/loan-Info.component';
import { ScenarioPipelineComponent } from './scenario-pipeline/scenario-pipeline.component';



import { LeaderBoardService } from './leaderboard/leaderboard.service';
import { LoanInformationService } from './shared/loan-Info.service';

import { PipeModule } from './../../sl-ui-framework/pipe/pipe.module';
import { SharedModule } from './../shared/shared.module';
import { FilterPipelineService } from './shared/filter.pipeline.service';
import { MarketingService } from './marketing/marketing.service';
import { DashboardService } from './dashboard.service';
import { DashboardDataService } from './shared/dashboard-data.service';
/**
 * 
 * 
 * @export
 * @class DashboardModule
 */
@NgModule({
    imports: [HttpModule, BrowserModule, FormsModule, DashboardRoutingModule, PipeModule, SharedModule],
    declarations: [DashBoardPage,
        LeaderboardComponent,
        ProgressTrackComponent,
        MarketingComponent,
        LoanInformationComponent,
        ScenarioPipelineComponent],
    providers: [LeaderBoardService,
        LoanInformationService,
        FilterPipelineService, MarketingService, DashboardService, DashboardDataService]
})
export class DashboardModule { }
