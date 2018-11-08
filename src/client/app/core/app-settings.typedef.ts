
/**
 * @export
 * @class ApiServer
 */
export interface ApiServer {
    protocol: string;
    host: string;
    port: number;
    root: string;
}

/**
 * @export
 * @class AppConfig
 */
export class AppConfig {
    apiInfra: ApiInfra;
    general: General;
}

/**
 * @export
 * @class AppVersion
 */
export class AppVersion {
    appVersion: string;
}

/**
 * @export
 * @class ApiInfra
 */
export class ApiInfra {
    gateWay: ApiServer;
    auth: ApiServer;
}

/**
 * @export
 * @class General
 */
export class General {
    isRsaEnabled: boolean;
    userType: string;
    appId: string;
    deviceType: string;
    env: string;
}
