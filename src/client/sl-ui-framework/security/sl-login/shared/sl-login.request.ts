/**
 * 
 * 
 * @export
 * @class GetLoginRequest
 */
export class GetLoginRequest {
    grant_type: string;
    username: string;
    password: string;
    rsaToken: string;
}

/**
 * 
 * 
 * @export
 * @class GetLogoutRequest
 */
export class GetLogoutRequest {
    UserId: string;
}

