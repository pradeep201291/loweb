import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from './../../../../app/core/global-configuration/settings';
import { StearnsHttpClient } from '../../../infrastructure/http-client/http-client.service';

import { PayLoadData } from './sl-login.user';
import { LoginResponse } from './sl-login.response';
import { GetLoginRequest, GetLogoutRequest } from './sl-login.request';
import { JWTHelper } from './../sl-login.jwtHelper';
import { LoginAppConstants } from './../shared/sl-login.constants';
import 'rxjs/add/observable/throw';
import { Encoder } from '../sl-login.encoder';
/**
 * 
 * 
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {

  /**
   * Creates an instance of AuthenticationService.
   * 
   * 
   * @memberOf AuthenticationService
   */
  constructor(private http: StearnsHttpClient,
    private appConfig: AppSettings) {
  }

  /**
  * 
  * 
  * @param {GetLoginRequest} request
  * @returns {Observable<boolean>}
  * 
  * @memberOf AuthenticationService
  */
  login(request: GetLoginRequest): Observable<boolean> {
    let loginResponse: LoginResponse, payLoadData: PayLoadData;
    let serviceUrl = this.appConfig.serviceConfig.AuthUrl + this.appConfig.serviceConfig.loginUrl;
    let body = this.getRequestBody(request);
    return this.http.login(serviceUrl, body, request.username)
      .map((response: Response) => {
        let isValid = response.json() && response.json().access_token;
        payLoadData = this.getTokenParsed(response.json().access_token);
        loginResponse = this.getLoginResponse(response.json());

        if (isValid && loginResponse && payLoadData) {
          sessionStorage.setItem(LoginAppConstants.current_user, JSON.stringify(
            {
              UserId: request.username,
              role: payLoadData.role,
              access_token: loginResponse.access_token,
              refresh_token: loginResponse.refresh_token,
              expires_in: loginResponse.expires_in,
              issued: loginResponse.issued,
              expires: loginResponse.expires,
              userName: payLoadData.unique_name
            }));
          return true;
        } else {
          return false;
        }
      }).catch(err => {
        return Observable.throw(err);
      });
  }

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf AuthenticationService
   */
  logout(request: GetLogoutRequest) {
    let serviceUrl = this.appConfig.serviceConfig.AuthUrl + this.appConfig.serviceConfig.logOutUrl;
    return this.http.post(serviceUrl, request, null, true)
      .map((response: Response) => {
        return true;
      }).catch(err => {
        return Observable.throw(err);
      });
  }

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf AuthenticationService
   */
  isLoggedIn() {
    return sessionStorage.getItem(LoginAppConstants.current_user) && sessionStorage.getItem(LoginAppConstants.current_user) !== null;
  }

  /**
   * 
   * 
   * @param {string} jwtToken
   * @returns {PayLoadData}
   * 
   * @memberOf AuthenticationService
   */
  getTokenParsed(jwtToken: string): PayLoadData {
    let jwtHelper = new JWTHelper();
    let payLoadData: PayLoadData;
    let result = jwtHelper.decodeToken(jwtToken);
    if (result !== '') {
      payLoadData = new PayLoadData();
      payLoadData.unique_name = result['unique_name'];
      payLoadData.role = result['role'];
      payLoadData.expires = result['exp'];
      return payLoadData;
    }
    return null;
  }

  /**
   * 
   * 
   * @param {Object} responseObj
   * @returns {LoginResponse}
   * 
   * @memberOf AuthenticationService
   */
  getLoginResponse(responseObj: any): LoginResponse {

    if (responseObj !== null) {
      return {
        access_token: responseObj['access_token'],
        token_type: responseObj['token_type'],
        expires_in: responseObj['expires_in'],
        refresh_token: responseObj['refresh_token'],
        UserName: responseObj['UserName'],
        UserType: responseObj['UserType'],
        issued: responseObj['.issued'],
        expires: responseObj['.expires']
      };
    }
    return null;
  }

  /**
   * 
   * 
   * @param {GetLoginRequest} request
   * @param {LoginResponse} loginResponse
   * @param {PayLoadData} payLoadData
   * @returns {boolean}
   * 
   * @memberOf AuthenticationService
   */
  isResponseObjValid(request: GetLoginRequest,
    loginResponse: LoginResponse): boolean {
    return loginResponse.UserName !== '' &&
      request.username !== '' &&
      loginResponse.UserName.trim() === request.username.trim();
  }

  /**
   * 
   * 
   * @param {string} userName
   * @returns
   * 
   * @memberOf AuthenticationService
   */
  getHashValue(userName: string) {
    let hash = 0;
    userName = userName + '@/q2#';
    for (let i = 0; i < userName.length; i++) {
      let char = userName.charCodeAt(i);
      hash += char;
    }
    return hash.toString();
  }

  /**
   * 
   * 
   * @param {GetLoginRequest} request
   * @returns
   * 
   * @memberOf AuthenticationService
   */
  getRequestBody(request: GetLoginRequest) {
    let urlSearchParams = new URLSearchParams('', new Encoder());
    urlSearchParams.append('grant_type', request.grant_type);
    urlSearchParams.append('username', request.username);
    if (this.appConfig.encodePassword) {
      urlSearchParams.append('password', btoa(request.password));
    } else {
      urlSearchParams.append('password', request.password);
    }
    urlSearchParams.append('rsatoken', request.rsaToken);
    return urlSearchParams.toString();
  }

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf AuthenticationService
   */
  getUserSessionDetails() {
    let userSessionDetails = JSON.parse(sessionStorage.getItem(LoginAppConstants.current_user));
    if (userSessionDetails && userSessionDetails !== null) {
      return {
        UserId: userSessionDetails.UserId,
        role: userSessionDetails.role,
        access_token: userSessionDetails.access_token,
        refresh_token: userSessionDetails.refresh_token,
        expires_in: userSessionDetails.expires_in,
        issued: userSessionDetails.issued,
        expires: userSessionDetails.expires
      };
    }
    return null;
  }

}
