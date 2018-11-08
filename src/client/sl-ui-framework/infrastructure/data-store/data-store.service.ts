import { Injectable } from '@angular/core';
import { SharedResource } from './data-store.resource';
import * as _ from 'lodash';
@Injectable()
export class DataStoreService {
    requestCount: number;
    set RequestCount(value: number) {
        this.requestCount = value;
        sessionStorage.setItem(SharedResource.lo_request_count, value.toString());
    }
    get RequestCount() {
        return this.requestCount;
    }
    constructor() {
        this.RequestCount = 0;
    }
    /**
     * @desc det device id for a user
     * 
     * @param {string} [userId]
     * @returns {string}
     * 
     * @memberOf DataStoreService
     */
    getDeviceId(): string {
        let session_device_id: string = (sessionStorage.getItem(SharedResource.device_ID));
        if (session_device_id && session_device_id !== null) {
            return session_device_id;
        } else {
            /** If not present in session, add it to session and then return */
            let uniqueId = this.generateGuid();
            sessionStorage.setItem(SharedResource.device_ID, uniqueId);
            return uniqueId;
        }
    }


    /**
     * 
     * 
     * @returns
     * 
     * @memberOf DataStoreService
     */
    getUserId() {
        let userSessionDetails = JSON.parse(sessionStorage.getItem(SharedResource.currentUser));
        if (userSessionDetails && userSessionDetails !== null) {
            return userSessionDetails.UserId;
        }
        return null;
    }

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf DataStoreService 
     */
    getAccessToken() {
        let userSessionDetails = JSON.parse(sessionStorage.getItem(SharedResource.currentUser));
        if (userSessionDetails && userSessionDetails !== null) {
            return userSessionDetails.access_token;
        }
        return null;
    }

    /**
     * @desc company code retrieved from private label json
     * 
     * @returns
     * 
     * @memberOf DataStoreService
     */
    getCompanyCode() {
        return sessionStorage.getItem(SharedResource.companyCode);
    }

    /**
     * 
     * 
     * @private
     * @returns
     * 
     * @memberOf DataStoreService
     */
    private getRandomChar() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    /**
     * 
     * 
     * @private
     * @returns
     * 
     * @memberOf DataStoreService
     */
    private generateGuid() {
        return this.getRandomChar() + this.getRandomChar() + '-' + this.getRandomChar() + '-' + this.getRandomChar() + '-' +
            this.getRandomChar() + '-' + this.getRandomChar() + this.getRandomChar() + this.getRandomChar();
    }

    /**
     * @desc user information 
     * 
     * @returns
     * 
     * @memberOf DataStoreService
     */
    getUserFromSession() {
        let userSessionDetails = JSON.parse(sessionStorage.getItem(SharedResource.currentUser));
        if (userSessionDetails && userSessionDetails !== null) {
            return {
                UserId: userSessionDetails.UserId,
                role: userSessionDetails.role,
                access_token: userSessionDetails.access_token,
                refresh_token: userSessionDetails.refresh_token,
                expires_in: userSessionDetails.expires_in,
                issued: userSessionDetails.issued,
                expires: userSessionDetails.expires,
                userName: userSessionDetails.userName
            };
        }
        return null;
    }

    updateUserDetails(data: any) {
        let userSessionDetails = JSON.parse(sessionStorage.getItem(SharedResource.currentUser));
        if (userSessionDetails && userSessionDetails !== null) {
            let temp = Object.assign({}, userSessionDetails);
            temp['access_token'] = data['access_token'];
            temp['refresh_token'] = data['refresh_token'];
            temp['expires_in'] = data['expires_in'];
            temp['issued'] = data['.issued'];
            temp['expires'] = data['.expires'];
            sessionStorage.setItem(SharedResource.currentUser, JSON.stringify(temp));
        }
    }

    getRefreshToken() {
        let userSessionDetails = JSON.parse(sessionStorage.getItem(SharedResource.currentUser));
        if (userSessionDetails && userSessionDetails !== null) {
            return userSessionDetails.refresh_token;
        }
        return null;
    }

    clearSessionStore() {
        sessionStorage.removeItem(SharedResource.currentUser);
    }

    getClientSession(): string {
        let session_id: string = sessionStorage.getItem(SharedResource.lo_session);
        if (session_id && session_id !== null) {
            return session_id;
        } else {
            let uniqueId = this.generateGuid();
            sessionStorage.setItem(SharedResource.lo_session, uniqueId);
            return uniqueId;
        }
    }

    getRequestCount(): number {
        let count: string = sessionStorage.getItem(SharedResource.lo_request_count);
        if (!count && _.isUndefined(count)) {
            this.RequestCount = 1;
            return 1;
        };
        let val = Number(count);
        this.RequestCount = ++val;
        return this.RequestCount;
    }
}
