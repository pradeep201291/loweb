import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';

import { DocumentList, ViewDocument } from './documents.model';

@Injectable()
export class DocumentService {

    /**
     * isDocumentUploaded
     * 
     * @type {boolean}
     * @memberOf DocumentService
     */
    isDocumentUploaded: boolean = false;
    /**
     * Creates an instance of DocumentService.
     * 
     * @param {StearnsHttpClient} _http
     * @param {AppSettings} appSettings
     * 
     * @memberOf DocumentService
     */
    constructor(private _http: StearnsHttpClient, private appSettings: AppSettings) {
    }



    /**
     * 
     * 
     * @param {string} loan_num
     * @param {string} src
     * @returns {Observable<DocumentList>}
     * 
     * @memberOf DocumentService
     */
    getLoanDocuments(loan_num: string, src: string): Observable<DocumentList> {
        let conditionListApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.documentsUrl;
        return this._http.post(conditionListApi, { loan_num, src })
            .map((response: Response) => response.json());
    }


    /**
     * 
     * 
     * @param {string} loan_num
     * @param {string} src
     * @param {string} id
     * @returns {Observable<DocumentList>}
     * 
     * @memberOf DocumentService
     */
    viewDocuments(src: string, loan_num: string, document_id: string): Observable<ViewDocument> {
        let conditionListApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.viewDocumentsUrl;
        return this._http.post(conditionListApi, { src, loan_num, document_id })
            .map((response: Response) => response.json());
    }

}
