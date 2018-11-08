/**
 * Routing configuration for product pricing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PricingResultsComponent } from './pricing-results/pricing-results.component';
import { PricingEngineComponent } from './pricing-engine/pricing-engine.component';
import { ProductPricingPage } from './product-pricing.page';
import { AuthorizationGuard } from '../../././sl-ui-framework/security/sl-login//shared/sl-login.guard';
import { ScenarioDetailsComponent } from './scenario-details/scenario-details.component';

const productPricingRoutes: Routes = [
    {
        path: 'pricing',
        component: ProductPricingPage,
        canActivate: [AuthorizationGuard],
        children: [
            {
                path: '',
                redirectTo: '/pricing/price-it',
                pathMatch: 'full'

            },
            {
                path: 'price-it',
                component: PricingEngineComponent
            },
            {
                path: 'products',
                component: PricingResultsComponent
            },
            {
                path: 'scenarios/:priceQuoteId/:borrowerName',
                component: ScenarioDetailsComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(productPricingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductPricingRoutingModule { }
