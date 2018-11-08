/**
 * Routing configuration for Leaderboard
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPage } from './leader-board.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

const leaderboardRoutes: Routes = [
    { path: 'leaderboard', component: LeaderboardPage, canActivate: [AuthorizationGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(leaderboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LeaderboardRoutingModule { }
