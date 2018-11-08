import { Injectable } from '@angular/core';

import { AppConfig, AppVersion } from './app-settings.typedef';
import { ApiConfig } from './config/api-config';
import { AppConstants } from './config/app-constant';

@Injectable()
export class AppSettingsService {
    appConfig: AppConfig;
    apiConfig = ApiConfig;
    appConstant = AppConstants;
    version: AppVersion;

    constructor() {
        this.appConfig = require('./config/app-config.json');
        this.version = require('./config/version.json');
    }

    getBaseUrl(type: string): string {
        let authServer = this.appConfig.apiInfra.auth;
        let gateWayServer = this.appConfig.apiInfra.gateWay;
        let env = this.appConfig.general.env;
        let baseUrl: string;
        if (env !== '') { env = '/' + env; }
        if (type === 'auth') {
            baseUrl = `${authServer.protocol}://${authServer.host}:${authServer.port}/${authServer.root}${env}`;
        } else if (type === 'gateway') {
            baseUrl = `${gateWayServer.protocol}://${gateWayServer.host}:${gateWayServer.port}/${gateWayServer.root}${env}`;
        }
        return baseUrl;
    }
}
