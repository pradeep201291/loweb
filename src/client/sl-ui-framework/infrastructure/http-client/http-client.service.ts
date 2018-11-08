import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';
import { ProgressBarService } from './../progress-bar/progress-bar.service';
import { AppSettings } from './../../../app/core/global-configuration/settings';
import { DataStoreService } from '../data-store/data-store.service';
import { HttpStatus } from './http-client.resource';

@Injectable()
export class StearnsHttpClient {
    private httpStatus: any;
    private isRefreshTokenNegotiationInProgress = false;
    private isRefreshTokenSubscription = new Subject<boolean>();
    private isRefreshTokenSubscription$ = this.isRefreshTokenSubscription.asObservable();
    constructor(private http: Http,
        private progressBarService: ProgressBarService,
        private appSettings: AppSettings,
        private dataStoreService: DataStoreService,
        private router: Router) {
        this.httpStatus = HttpStatus;
    }

    private configureHeaders(headers: Headers) {
        if (this.dataStoreService.getAccessToken()) {
            headers.append('X-user_name', this.dataStoreService.getUserId());
            headers.append('X-user_type', this.appSettings.security.userType);
            headers.append('X-user_session', this.dataStoreService.getClientSession());
            headers.append('Authorization', `Bearer ${this.dataStoreService.getAccessToken()}`);
            headers.append('X-dev_id', this.dataStoreService.getDeviceId());
            headers.append('X-dev_type', 'web');
            headers.append('X-app_id', 'lo_web');
            headers.append('X-app_ver', this.appSettings.version);
            headers.append('X-company_code', this.dataStoreService.getCompanyCode());
            headers.append('X-broker_code', '');
            headers.append('X-client_request', this.dataStoreService.getRequestCount().toString());
        }
    }

    private request(url: string, options: RequestOptionsArgs, data?: Object): Observable<Response> {
        if (data) {
            options.body = data;
        }
        return this.http.request(url, options).catch((error: any) => {
            if (error.status === this.httpStatus.TokenExpire) {
                if (this.isRefreshTokenNegotiationInProgress) {
                    return this.isRefreshTokenSubscription$.flatMap(res => {
                        if (options.headers.has('Authorization')) {
                            options.headers.delete('Authorization');
                            options.headers.append('Authorization', `Bearer ${this.dataStoreService.getAccessToken()}`);
                        }
                        return this.request(url, options, data);
                    });
                } else {
                    let serviceUrl = this.appSettings.serviceConfig.AuthUrl + this.appSettings.serviceConfig.loginUrl;
                    this.isRefreshTokenNegotiationInProgress = true;
                    /**request param is framed to get access token */
                    let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append('grant_type', 'refresh_token');
                    urlSearchParams.append('refresh_token', this.dataStoreService.getRefreshToken());
                    /**caller for login url */
                    let headers: Headers;
                    headers = new Headers();
                    headers.append('X-user_name', this.dataStoreService.getUserId());
                    headers.append('X-user_type', 'LoanOfficer');
                    headers.append('X-dev_id', this.dataStoreService.getDeviceId());
                    headers.append('X-dev_type', 'web');
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    headers.append('X-app_ver', this.appSettings.version);
                    headers.append('X-company_code', this.dataStoreService.getCompanyCode());
                    headers.append('X-broker_code', '');

                    this.progressBarService.enqueue();
                    return this.http.post(serviceUrl, urlSearchParams.toString(), { headers: headers })
                        .flatMap((response: any) => {
                            this.progressBarService.dequeue();
                            let tokenInfo = response.json();
                            let accessToken = tokenInfo.access_token;
                            if (options.headers.has('Authorization')) {
                                options.headers.delete('Authorization');
                                options.headers.append('Authorization', `Bearer ${accessToken}`);
                            }
                            /**update the current user date in session store */
                            this.dataStoreService.updateUserDetails(tokenInfo);
                            this.isRefreshTokenNegotiationInProgress = false;
                            this.isRefreshTokenSubscription.next(true);
                            return this.request(url, options, data);
                        }).catch(err => {
                            this.progressBarService.reset();
                            this.dataStoreService.clearSessionStore();
                            this.isRefreshTokenNegotiationInProgress = false;
                            this.router.navigate(['/login']);
                            return Observable.throw(error);
                        });
                }

            }
            return Observable.throw(error);
        });
    }

    /**
     * This method enables and disables the progress bar with the respective service response
     */
    get(url: string, responseType?: ResponseContentType, contentType?: string, configuredHeaders?: boolean): Observable<Response> {
        let headers = new Headers();
        if (!contentType || contentType === '') {
            headers.append('Content-Type', 'application/json');
        } else {
            headers.append('Content-Type', contentType);

        }
        if (!configuredHeaders) {
            this.configureHeaders(headers);
        }
        this.progressBarService.enqueue();

        return this.request(url, {
            method: RequestMethod.Get,
            headers: headers,
            responseType: responseType
        }).map(response => {
            this.progressBarService.dequeue();
            return response;
        });


    }

    /**
     * This method enables and disables the progress bar with the respective service response
     */
    post(url: string, data: any, contentType?: string, islogout?: boolean): Observable<Response> {
        let headers = new Headers();
        if (!contentType || contentType === '') {
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
        }
        this.configureHeaders(headers);
        this.progressBarService.enqueue();
        if (islogout) {
            sessionStorage.removeItem('current_user');
        }

        return this.request(url, {
            method: RequestMethod.Post,
            headers: headers,
        }, data).map(response => {
            this.progressBarService.dequeue();
            return response;
        });

    }

    /**
     * 
     * 
     * @param {string} url
     * @param {*} data
     * @returns {Observable<Response>}
     * 
     * @memberOf StearnsHttpClient
     */
    login(url: string, data: any, userName: string): Observable<Response> {
        let headers: Headers;
        headers = new Headers();
        headers.append('X-user_name', userName);
        headers.append('X-user_type', 'LoanOfficer');
        headers.append('X-user_session', this.dataStoreService.getClientSession());
        headers.append('X-dev_id', this.dataStoreService.getDeviceId());
        headers.append('X-dev_type', 'web');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-app_ver', this.appSettings.version);
        headers.append('X-company_code', this.dataStoreService.getCompanyCode());
        headers.append('X-broker_code', '');
        this.progressBarService.enqueue();
        let request = this.http.post(url, data, { headers: headers });
        return request.map(response => {
            this.progressBarService.dequeue();
            return response;
        }).catch(e => {
            this.progressBarService.dequeue();
            return this.handleError(e);
        });
    }

    /**
     * 
     * 
     * @param {string} url
     * @returns {Observable<Response>}
     * 
     * @memberOf StearnsHttpClient
     */
    getAnnouncement(url: string): Observable<Response> {
        let headers = new Headers();
        headers.append('X-user_name', 'LoanOfficer');
        headers.append('X-user_type', 'LoanOfficer');
        headers.append('Content-Type', 'application/json');
        headers.append('X-app_ver', this.appSettings.version);

        // this.progressBarService.toggle(true);
        this.progressBarService.enqueue();

        let request = this.http.get(url, {
            headers: headers
        });

        return request.map(response => {
            this.progressBarService.dequeue();
            return response;
        }).catch(e => {
            this.progressBarService.dequeue();
            return this.handleError(e);
        });
    }

    /**
     * 
     * 
     * @private
     * @param {(Response | any)} error
     * @returns
     * 
     * @memberOf StearnsHttpClient
     */
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error.json());
    }
}
