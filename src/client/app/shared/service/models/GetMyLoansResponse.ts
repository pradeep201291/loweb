export interface Completion {
    c: number;
    v: string;
}

export class LoanInfo {
    src: string;
    loan_num: string;
    prop_address: string;
    prop_city: string;
    prop_state: string;
    prop_zip: string;
    status: string;
}

export interface MyLoansResponseInfo {
    completion: Completion;
    data: LoanInfo[];
}
