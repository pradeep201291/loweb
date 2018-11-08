/**
 * Routing configuration for Pipeline
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PipelinePage } from './pipeline.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';

import { StatusPage } from './../status/status.page';
import { NotificationPage } from './../notification/notification.page';

import { ConditionListPage } from './../condition-list/condition-list.page';
import { LoanDetailsPage } from './../loan-details/loan-details.page';

import { MessagePage } from './../message/message.page';
import { DocumentPage } from './../documents/documents.page';

const pipelineRoutes: Routes = [
    {
        path: 'pipeline',
        component: PipelinePage,
        canActivate: [AuthorizationGuard],
        children: [
            {
                path: '',
                redirectTo: '/pipeline/status',
                pathMatch: 'full'

            },
            {
                path: 'status',
                component: StatusPage,
            },
            {
                path: 'notification',
                component: NotificationPage,
            },
            {
                path: 'conditions',
                component: ConditionListPage,
            },
            {
                path: 'loandetails',
                component: LoanDetailsPage,
            },
            {
                path: 'message',
                component: MessagePage,
            },
            {
                path: 'documents',
                component: DocumentPage,
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(pipelineRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PipelineRoutingModule {

}
