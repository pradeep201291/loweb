import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';
import { UnreadNotificationCount } from './pipeline.model';

@Injectable()
export class PipeLineService {

    /**
     * Creates an instance of ConditionListService.
     * 
     * @param {StearnsHttpClient} _http
     * @param {AppSettings} appSettings
     * 
     * @memberOf ConditionListService
     */
    constructor(private _http: StearnsHttpClient, private appSettings: AppSettings) {
    }

    /**
     * 
     * 
     * @param {string} loan_num
     * @param {string} src
     * @returns {Observable<ConditionDetails[]>}
     * 
     * @memberOf ConditionListService
     */
    getConditionListDetails(loan_num: string, src: string): Observable<UnreadNotificationCount> {
        let notificationCountApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.getNotificationsCount;
        return this._http.post(notificationCountApi, { loan_num, src })
            .map((response: Response) => response.json());
    }

    getTotalNotificationCount(): Observable<UnreadNotificationCount> {
        let totalNotificationCountUrl = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.getNotificationsCount;
        return this._http.post(totalNotificationCountUrl, {
            loan_num: '',
            src: 'Empower'
        }).map((response: Response) => response.json());
    }

}
