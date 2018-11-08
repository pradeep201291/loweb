/**
 * Routing configuration for Checklist
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusPage } from './status.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

const statusRoutes: Routes = [
     {path: 'status', component: StatusPage, canActivate: [AuthorizationGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(statusRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class StatusRoutingModule {

}
