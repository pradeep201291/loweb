import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from '../././sl-ui-framework/security/sl-login/sl-login.component';


/**
 * Login and a dummy profile component is been configured with the path for testing login authentication.
 * The Guard is here to authorize the user upon viewing profile component.
 */
const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent }
];

/**
 * The provider appRoutingProviders is imported to app.module providers.
 */
export const appRoutingProviders: any[] = [
];

/**
 * The constant routed paths is added to the application listener.
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
