import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { GetMessageResponse } from './message-page.model';
import { MessageRequest, SenderRequest, ReceiverResponse, MarkReadRequest, MessageUnreadCount } from './message-page.model';
import { StearnsHttpClient } from './../../../sl-ui-framework/infrastructure/http-client/http-client.service';

import { AppSettings } from './../../core/global-configuration/settings';


/**
 * 
 * @export
 * @class MessageService
 */
@Injectable()

export class MessageService {

    selectedContactName: string;
    /**
     * Creates an instance of MessageService.
     * 
     * @param {StearnsHttpClient} http
     * @param {AppSettings} appConfig
     * 
     * @memberOf MessageService
     */
    constructor(private http: StearnsHttpClient, private appConfig: AppSettings) { }

    /**
     * 
     * @param {MessageRequest} request
     * @returns {Observable<GetMessageResponse>}
     * 
     * @memberOf MessageService
     */
    getMessageResponse(request: MessageRequest): Observable<GetMessageResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.getMessageDataForLoan;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => <GetMessageResponse>response.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    /**
     * 
     * 
     * @param {MessageRequest} request
     * @returns {Observable<UnreadCount>}
     * 
     * @memberOf MessageService
     */
    getUnreadCount(src: string, loan_num: string): Observable<MessageUnreadCount> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.getMessageUnreadCount;
        return this.http.post(serviceUrl, { 'src': src, 'loan_num': loan_num })
            .map((response: Response) => <MessageUnreadCount>response.json());
    }



    /**
     * 
     * @param {SenderRequest} request
     * @returns {Observable<ReceiverResponse>}
     * 
     * @memberOf MessageService
     */
    sendMessage(request: SenderRequest): Observable<ReceiverResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.postMessageForLoan;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => <ReceiverResponse>response.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }


    /**
     * 
     * 
     * @param {SenderRequest} request
     * @returns {Observable<ReceiverResponse>}
     * 
     * @memberOf MessageService
     */
    markRead(request: MarkReadRequest): Observable<ReceiverResponse> {
        let serviceUrl = this.appConfig.serviceConfig.baseUrl +
            this.appConfig.serviceConfig.markUnreadUrl;
        return this.http.post(serviceUrl, request)
            .map((response: Response) => <ReceiverResponse>response.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

}
