import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule, RequestOptions, BaseRequestOptions } from '@angular/http';
import { UrlSerializer } from '@angular/router';

import { LayoutModule } from './../sl-ui-framework/layout/layout.module';
import { InfrastructureModule } from './../sl-ui-framework/infrastructure/infrastructure.module';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { SecurityModule } from './../sl-ui-framework/security/security.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrivateLabelService } from './shared/service/private-label.service';
import { StearnsHttpClient } from './../sl-ui-framework/infrastructure/http-client/http-client.service';
import { StatusModule } from './status/status.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { CoreModule } from './core/core.module';
import { ConditionListModule } from './condition-list/condition-list.module';
import { LoanDetailsModule } from './loan-details/loan-details.module';
import { NavNotificationModule } from './nav-notification/nav-notification.module';
import { DocumentModule } from './documents/documents.module';
import { ProductPricingModule } from './product-pricing/product-pricing.module';
import { LeaderboardModule } from './leader-board/leader-board.module';
import { LowerCaseUrlSerializer } from './url.serializer';
import { CommunicationModule } from '../sl-ui-framework/communication/communication.module';
/**
 * All the API requests needs to be configured here
 */
class StearnsApiRequestOptions extends BaseRequestOptions {

  /**
   * The constructor
   */
  constructor() {
    super();
    this.configureHeaders();
  }

  /**
   * Add all the headers here
   */
  private configureHeaders(): void {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
}

/**
 * 
 */
@NgModule({
  imports: [BrowserModule, HttpModule, routing, LayoutModule, InfrastructureModule,
    SecurityModule, DashboardModule, StatusModule, NotificationModule, PipelineModule, CoreModule,
    ConditionListModule, LoanDetailsModule, NavNotificationModule, MessageModule, DocumentModule,
    ProductPricingModule, LeaderboardModule, CommunicationModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [Title, appRoutingProviders, PrivateLabelService, StearnsHttpClient,
    { provide: RequestOptions, useClass: StearnsApiRequestOptions },
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
  ]
})
export class AppModule { }
