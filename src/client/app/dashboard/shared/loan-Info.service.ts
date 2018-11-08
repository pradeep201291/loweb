import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { StearnsHttpClient } from './../../../sl-ui-framework/infrastructure/http-client/http-client.service';


import { PipelineServiceResponse } from './loan-Info.model';

import { AppSettings } from './../../core/global-configuration/settings';

@Injectable()
export class LoanInformationService {

    constructor(private http: StearnsHttpClient, private appConfig: AppSettings) { }

    /**
     * Gets the pipeline
     * 
     * @returns {Observable<PipelineServiceResponse>}
     * 
     * @memberOf LoanInformationService
     */
    getPipeline(): Observable<PipelineServiceResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.methodUrl +
            this.appConfig.serviceConfig.getPipelineUrl;
        return this.http.get(serviceUrl)
            .map((response: Response) => <PipelineServiceResponse>response.json());
    }

    /**
     * 
     * Gets the pipeline by widget
     * @param {string} widget
     * @returns {Observable<PipelineServiceResponse>}
     * 
     * @memberOf LoanInformationService
     */
    getPipelineByWidget(widget: string): Observable<PipelineServiceResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.methodUrl +
            this.appConfig.serviceConfig.getPipelineUrl + '/' + widget;
        return this.http.get(serviceUrl)
            .map((response: Response) => <PipelineServiceResponse>response.json());
    }

    /**
     * Searches the pipeline
     * 
     * @param {string} searchBy
     * @param {string} searchText
     * @returns {Observable<PipelineServiceResponse>}
     * 
     * @memberOf LoanInformationService
     */
    searchPipeline(searchBy: string, searchText: string, activeOnly?: boolean): Observable<PipelineServiceResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.methodUrl +
            this.appConfig.serviceConfig.searchPipelineUrl;
        return this.http.post(serviceUrl, {
            'search_by': searchBy,
            'search_text': searchText,
            'active_only': activeOnly ? activeOnly : false
        }
        ).map((response: Response) => <PipelineServiceResponse>response.json());
    }
}
