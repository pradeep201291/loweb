import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';
import { AppSettings } from './../core/global-configuration/settings';
import { GetScenarioPipelineResponse, GetScenarioPipelineRequest } from './dashboard.typedef';

/**
 * A service for managing dashboard
 * 
 * @export
 * @class DashboardService
 */
@Injectable()
export class DashboardService {

    /**
     * Creates an instance of DashboardService.
     * 
     * @param {StearnsHttpClient} http
     * @param {AppSettings} appSettings
     * 
     * @memberOf DashboardService
     */
    constructor(private http: StearnsHttpClient, private appSettings: AppSettings) {
    }

    /**
     * get scenario pipeline 
     * 
     * @returns {Observable<GetScenarioPipelineResponse>}
     * 
     * @memberOf DashboardService
     */
    getScenarioPipeline(request: GetScenarioPipelineRequest): Observable<GetScenarioPipelineResponse> {
        let serviceUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.getScenarioPipeline;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => {
                let data = <GetScenarioPipelineResponse>response.json();
                return data;
            });
    }
}
