/**
 * Routing configuration for Loan Details Page
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoanDetailsPage } from './loan-details.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

const loanDetailsRoutes: Routes = [
     {path: 'loandetails', component: LoanDetailsPage, canActivate: [AuthorizationGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(loanDetailsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LoanDetailsRoutingModule {

}
