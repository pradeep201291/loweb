import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SnapShotResponse } from './status.model';
import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class StatusService {

    /**
     * constructor
     * @param _http: Http
     * @param appSettings: AppSettings
     */
    constructor(private _http: StearnsHttpClient, private appSettings: AppSettings) {
    }

    /**
     * get the snapshot for loan and src
     */
    getSnapShot(loan_num: string, src: string): Observable<SnapShotResponse> {
        let snapShotUrl = this.appSettings.serviceConfig.baseUrl +
            this.appSettings.serviceConfig.methodUrl +
            this.appSettings.serviceConfig.getSnapshotUrl;

        let result = this._http.post(snapShotUrl, { loan_num, src })
            .map((response: Response) => response.json());
        return result;
    }
}
