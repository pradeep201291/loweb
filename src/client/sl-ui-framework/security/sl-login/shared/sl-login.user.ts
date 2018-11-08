/**
 * 
 * 
 * @export
 * @class PayLoadData
 */
export class PayLoadData {
    unique_name: string;
    role: string;
    expires: string;
}
/**
 * 
 * 
 * @export
 * @class User
 */
export class User {
    constructor(public email: string, public password: string, public rsaToken?: string) {
    }
}
