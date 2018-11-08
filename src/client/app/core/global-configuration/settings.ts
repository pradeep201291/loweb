/**
 * 
 * 
 * @export
 * @class ServiceConfig
 */
export class ServiceConfig {
    baseUrl: string;
    AuthUrl: string;
    loginUrl: string;
    logOutUrl: string;
    methodUrl: string;
    lookupUrl: string;
    getAllSummaryForUserUrl: string;
    getSummaryForLoanUrl: string;
    getDashboardForLoanUrl: string;
    getMyLoansUrl: string;
    getAnnouncementsUrl: string;
    getNotificationsCount: string;
    getNotificationsForLoan: string;
    markNotificationAsRead: string;
    markNotificationAsUnRead: string;
    deleteNotification: string;
    getLeaderBoardUrl: string;
    getPipelineUrl: string;
    getSnapshotUrl: string;
    searchPipelineUrl: string;
    getBroadcastNotifications: string;
    getMarketingUrl: string;
    conditionListUrl: string;
    getLoanDetailUrl: string;
    getMessageDataForLoan: string;
    getMessageUnreadCount: string;
    postMessageForLoan: string;
    markUnreadUrl: string;
    documentsUrl: string;
    viewDocumentsUrl: string;
    uploadDocumentUrl: string;
    priceItEnumList: string;
    priceItEnumType: string;
    getPriceIt: string;
    getPriceItAdjustments: string;
    saveScenario: string;
    getScenarioPipeline: string;
    getRateSheet: string;
    getScenarioDetails: string;
    getEligibleProducts: string;
    lockLoan: string;
    getAdjustments: string;
    getRatesheetForLoan: string;
    getZipCodeDetails: string;
}



/**
 * 
 * 
 * @export
 * @class Security
 */
export class Security {
    userName: string;
    userType: string;
    userSession: number;
    appId: string;
    token: string;
    isRsaEnabled: boolean;
    idleTimeout: number;
    popupTimeout: number;
}

/**
 * 
 * 
 * @export
 * @class AppSettings
 */
export class AppSettings {
    serviceConfig: ServiceConfig;
    security: Security;
    version: string;
    encodePassword: boolean;
}


/**
 * @export
 * @class AppVersion
 */
export class AppVersion {
    appVersion: string;
}
