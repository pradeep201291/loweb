import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppSettings } from './../../../app/core/global-configuration/settings';
import { StearnsHttpClient } from './../../infrastructure/http-client/http-client.service';


@Injectable()
export class AnnouncementService {

    /**
     * The constructor.
     * @param _http: Http
     * @param appConfig: AppSettings
     */
    constructor(private _http: StearnsHttpClient, private appConfig: AppSettings) {
    }

    /**
     * Gets announcements
     */
    getAnnouncements(): Observable<any> {
        let announcementUrl = this.appConfig.serviceConfig.baseUrl + this.appConfig.serviceConfig.getAnnouncementsUrl;
        let result = this._http.getAnnouncement(announcementUrl)
            .map((response: Response) => response.json());
        return result;
    }
}
