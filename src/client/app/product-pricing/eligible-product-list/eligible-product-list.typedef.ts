import { AdjustmentsData } from './../product-pricing.typedef';
/**
 * 
 * 
 * @export
 * @interface EligibleProduct
 */
export interface EligibleProduct {
    product_name: string;
    program_name: string;
    rate: number;
    term: number;
    loan_amt: number;
    orig_comp: number;
    payment: number;
    borrower_price: number;
    lender_price: number;
    plan_id: number;
    discountPoints?: number;
    isDiscountPointsNegative?: boolean;
    discountAmount?: number;
    isDiscountAmountNegative?: boolean;
    adjustmentData?: AdjustmentsData;
}

/**
 * 
 * 
 * @export
 * @interface Computed
 */
export interface Computed {
    product_name: string;
    program_name: string;
    rate: number;
    term: number;
    loan_amt: number;
    orig_comp: number;
    payment: number;
    borrower_price: number;
    lender_price: number;
    plan_id: number;
}

/**
 * 
 * 
 * @export
 * @interface SaveSenario
 */
export interface SaveSenario {
    first_name: string;
    last_name: string;
}
