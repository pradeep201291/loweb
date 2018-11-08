import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LeaderBoardFilteredData, LeaderBoardData } from './leader-board.typedef';


import { GetLeaderBoardResponse } from './leader-board.typedef';

import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';


enum MeasurementType {
    units = 0,
    volume = 1
}

@Injectable()
export class LeaderBoardService {

    leaderBoardFilteredData: Array<LeaderBoardFilteredData>;


    constructor(private http: StearnsHttpClient, private appConfig: AppSettings) { }

    getLeaderBoardData(): Observable<GetLeaderBoardResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.getLeaderBoardUrl;
        return this.http.get(serviceUrl)
            .map((response: Response) => <GetLeaderBoardResponse>response.json());
    }

    manipulateLeaderBoard(totalCollection: LeaderBoardData[]) {
        this.leaderBoardFilteredData = new Array<LeaderBoardFilteredData>();
        // foreach item collection
        totalCollection.map((each) => {
            let result = this.leaderBoardFilteredData.find(x => x.name === each.name);
            if (result) {
                result.name = each.name;
                result.rank = each.rank;
                if (each.type === MeasurementType[MeasurementType.units]) {
                    result.unit = each.text;
                }
                if (each.type === MeasurementType[MeasurementType.volume]) {
                    result.volume = Number(each.text.replace(/\$/g, ''));
                }
            } else {
                let temp = {
                    name: each.name,
                    rank: each.rank,
                    unit: '',
                    volume: 0
                };
                if (each.type === MeasurementType[MeasurementType.units]) {
                    temp['unit'] = each.text;
                }
                if (each.type === MeasurementType[MeasurementType.volume]) {
                    temp['volume'] = Number(each.text.replace(/\$/g, ''));
                }
                this.leaderBoardFilteredData.push(temp);
            }
        });
        return this.leaderBoardFilteredData;
    }

}
