import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import {GetLeaderBoardResponse} from './leaderboard.model';

import { AppSettings } from './../../core/global-configuration/settings';
import { StearnsHttpClient } from './../../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class LeaderBoardService {

    constructor(private http: StearnsHttpClient, private appConfig: AppSettings) { }

    getFunders(): Observable<GetLeaderBoardResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
                            this.appConfig.serviceConfig.getLeaderBoardUrl;
        return this.http.get(serviceUrl)
            .map((response: Response) => <GetLeaderBoardResponse>response.json());
    }

}
