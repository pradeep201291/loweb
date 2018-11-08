import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import {GetMarketingResponse} from './marketing.model';

import { AppSettings } from './../../core/global-configuration/settings';
import { StearnsHttpClient } from './../../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class MarketingService {

    constructor(private http: StearnsHttpClient, private appConfig: AppSettings) { }

    getMarketingDetailsfromApi(): Observable<GetMarketingResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
                            this.appConfig.serviceConfig.getMarketingUrl;
        return this.http.get(serviceUrl)
            .map((response: Response) => <GetMarketingResponse>response.json());
    }

}
