/**
 * Routing configuration for Checklist
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavNotificationPage } from './nav-notification.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

const notificationRoutes: Routes = [
     {path: 'nav-notification', component: NavNotificationPage, canActivate: [AuthorizationGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(notificationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NavNotificationRoutingModule { }
