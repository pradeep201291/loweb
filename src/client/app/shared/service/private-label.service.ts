import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { PrivateLblResponse } from './../service/models/GetPrivateLabelResponse';

@Injectable()
export class PrivateLabelService {

    private privatelblUrl = '@SL_APP_ROOT_PATH@assets/config/private-label.json';
    constructor(private _http: Http) {
    }

    getPrivateLblResponse(): Observable<PrivateLblResponse>  {
        let result = this._http.get(this.privatelblUrl)
                 .map((response: Response) => <PrivateLblResponse>response.json());
        return result;
    }
}
