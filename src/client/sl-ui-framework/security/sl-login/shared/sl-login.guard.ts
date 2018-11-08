import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './sl-login.authentication.service';
import { LoginAppConstants } from './sl-login.constants';
/**
 * 
 * 
 * @export
 * @class AuthorizationGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private user: AuthenticationService, private route: Router) { }
  /**
   * 
   * 
   * @returns
   * 
   * @memberOf AuthorizationGuard
   */
  canActivate() {
    if (!(sessionStorage.getItem(LoginAppConstants.current_user))) {
      this.route.navigate(['/login']);
    }
    return this.user.isLoggedIn();
  }
}
