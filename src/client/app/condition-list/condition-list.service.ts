import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConditionDetails } from './condition-list.model';
import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class ConditionListService {

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
    getConditionListDetails(loan_num: string, src: string): Observable<ConditionDetails> {
        let conditionListApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.conditionListUrl;
        return this._http.post(conditionListApi, { loan_num, src })
            .map((response: Response) => response.json());
    }
}
