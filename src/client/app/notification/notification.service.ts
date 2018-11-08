import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { NotificationCountResponse, NotificationForLoanResponse } from './notification.model';
import { AppSettings } from './../core/global-configuration/settings';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';

@Injectable()
export class NotificationService {

    /**
     * constructor
     * @param http Http
     * @param appSettings AppSettings
     * 
     */
    constructor(private _http: StearnsHttpClient, private appSettings: AppSettings) {
    }

    /**
     * Gets the total notification Count
     */
    getNotificationCount(): Observable<NotificationCountResponse> {
        let notificationCountUrl = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.getNotificationsCount;
        let result = this._http.get(notificationCountUrl)
            .map((response: Response) => response.json());
        return result;
    }

    /**
        * Gets the broadcast notifications
        * 
        * @returns {Observable<NotificationForLoanResponse>}
        * 
        * @memberOf NotificationService
    */
    getBroadcastNotifications(): Observable<NotificationForLoanResponse> {
        let broadcastNotificationUrl = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.getNotificationsForLoan;
        return this._http.post(broadcastNotificationUrl, {
            loan_num: '',
            src: 'Empower'
        }).map((response: Response) => response.json());
    }

    /**
     * Gets the notification details for the loan
     * 
     * 
     * @param {string} loanNumber
     * @param {string} source
     * @returns {Observable<NotificationForLoanResponse>}
     * 
     * @memberOf NotificationService
     */
    getNotificationDetailsForLoan(loanNumber: string, source: string): Observable<NotificationForLoanResponse> {
        let notificationForLoanUrl = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.getNotificationsForLoan;
        return this._http.post(notificationForLoanUrl, {
            loan_num: loanNumber,
            src: source
        }).map((response: Response) => response.json());
    }

    /**
     * Mark notification as read
     * 
     * 
     * @param {number[]} loanNumbers
     * @returns
     * 
     * @memberOf NotificationService
     */
    markAsRead(loanNumbers: number[]) {
        let markAsReadApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.markNotificationAsRead;

        return this._http.post(markAsReadApi, { 'message_Id': loanNumbers })
            .map((response: Response) => response.json());
    }

    /**
    * Mark notification as unread
    * 
    * 
    * @param {number[]} loanNumbers
    * @returns
    * 
    * @memberOf NotificationService
    */
    markAsUnRead(loanNumbers: number[]) {
        let markAsUnReadApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.markNotificationAsUnRead;

        return this._http.post(markAsUnReadApi, { 'message_Id': loanNumbers })
            .map((response: Response) => response.json());
    }

    /**
    * Delete notification
    * 
    * 
    * @param {number[]} loanNumbers
    * @returns
    * 
    * @memberOf NotificationService
    */
    deleteNotification(loanNumbers: number[]) {
        let deleteNotificationApi = this.appSettings.serviceConfig.baseUrl + this.appSettings.serviceConfig.deleteNotification;

        return this._http.post(deleteNotificationApi, { 'message_Id': loanNumbers })
            .map((response: Response) => response.json());
    }


}
