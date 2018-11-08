/**
 * Routing configuration for Checklist
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConditionListPage } from './condition-list.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

const notificationRoutes: Routes = [
     {path: 'conditions', component: ConditionListPage, canActivate: [AuthorizationGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(notificationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ConditionListRoutingModule { }
