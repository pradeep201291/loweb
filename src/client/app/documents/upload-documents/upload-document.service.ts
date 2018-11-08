import { Injectable } from '@angular/core';

import { Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { StearnsHttpClient } from './../../../sl-ui-framework/infrastructure/http-client/http-client.service';
import { AppSettings } from './../../core/global-configuration/settings';
import { UploadDocumentModel, UploadDocumentResponse } from '../documents.model';
import { ApiResponse } from './../../../sl-ui-framework/infrastructure/api-response.typedef';
/**
 * A service for document upload
 * 
 * @export
 * @class DocumentUploadService
 */
@Injectable()
export class DocumentUploadService {
    /**
     * Creates an instance of DocumentUploadService.
     * 
     * @param {StearnsHttpClient} http
     * @param {AppSettings} appSettings
     * 
     * @memberOf DocumentUploadService
     */
    constructor(private http: StearnsHttpClient, private appSettings: AppSettings) {

    }

    /**
     * Upload Document API
     * 
     * @param {UploadDocumentModel} document
     * @returns {Observable<UploadDocumentResponse>}
     * 
     * @memberOf DocumentUploadService
     */
    uploadDocument(document: UploadDocumentModel): Observable<ApiResponse<UploadDocumentResponse>> {
        let url = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.uploadDocumentUrl;

        return this.http.post(url, document)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    /**
     * Get the document as blob from Dropbox
     * 
     * @param {string} url
     * @returns {Observable<Response>}
     * 
     * @memberOf DocumentUploadService
     */
    getDocumentFromDropBox(url: string, ): Observable<Response> {
        return this.http.get(url, ResponseContentType.Blob, 'text/plain; charset=dropbox-cors-hack', true)
            .map((response: Response) => response);
    }
}
