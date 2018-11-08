export interface InEligibleProduct {
    product_name: string;
    fail_reasons: Reason[];
}

export interface Reason {
    reason: string;
}
