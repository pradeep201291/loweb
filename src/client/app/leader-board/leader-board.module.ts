import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { LeaderboardPage } from './leader-board.page';
import { LeaderboardInfoComponent } from './leader-board-info/leader-board-info.component';
import { LeaderboardRoutingModule } from './leader-board-routing.module';
import { LeaderBoardService } from  './leader-board.service';

@NgModule({
    imports: [HttpModule, BrowserModule, FormsModule, SharedModule, LeaderboardRoutingModule],
    declarations: [LeaderboardPage, LeaderboardInfoComponent],
    providers: [LeaderBoardService],
})
export class LeaderboardModule {
}



