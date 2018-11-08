

export interface GetLoanDetailRequest {
    src: string;
    loan_num: string;
}


export interface Completion {
    c: number;
    v: string;
}

export interface Borrower {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
}

export interface Loan {
    allow_lock: string;
    loan_num: string;
    rate: string;
    lock_date: string;
    lock_exp_date: string;
    purchase_price: string;
    appraised_value: string;
    note_loan_amt: string;
    ltv: string;
    payment: string;
    discl_sent_date: string;
    closing_discl_date: string;
    clear_to_close_date: string;
    prop_address: string;
    prop_city: string;
    prop_state: string;
    prop_zip: string;
    prop_type: string;
    occupancy: string;
    purpose: string;
    base_loan_amt: string;
    app_date: string;
    cltv: string;
    hltv: string;
    program: string;
    price: string;
    est_close_date: string;
    disburse_date: string;
    uw_decision_exp_date: string;
    credit_exp_date: string;
    revised_loan_est_date: string;
    closing_docs_sent_date: string;
    borrower_address: string;
    loan_type: string;
    loan_term: string;
    amortization_type: string;
    ltv_b: string;
    ltv_n: string;
    rate_lock_period: string;
    fully_adjusted_points: string;
    final_approval_date: string;
    total_days_extended: string;
    total_days_relocked: string;
    first_payment: string;
    insurance: string;
    taxes: string;
    mi: string;
    hoa: string;
    other_expenses: string;
    secondary_financing: string;
    uw_decision_date: string;
    revised_loan_est_esign_date: string;
    loan_type_desc: string;
    amort_type_desc: string;
    p_and_i_payment: string;
    disc_esign_date: string;
    closing_disc_recv_date: string;
    revised_closing_disc_date: string;
    revised_closing_disc_recv_date: string;
    ltv_note: string;
    uw_decision: string;
    borrowers: Borrower[];
}

export interface LoanData {
    loan: Loan;
}

export interface LoanDetailResponse {
    completion: Completion;
    data: LoanData;
}

export interface LockLoanRequest {
    loan_num: string;
    src: string;
    plan_id: number;
    rate: number;
    price: number;
    lock_term: number;
}

export interface EligibleProduct {
    product_name: string;
    program_name: string;
    rate: string;
    term: number;
    loan_amt: number;
    orig_comp: number;
    payment: number;
    borrower_price: number;
    lender_price: number;
    plan_id: number;
}

export interface EligibleProduct {
    eligible_products: EligibleProduct[];
    ineligible_products: any[];
}

export interface GetEligibleProductResponse {
    completion: Completion;
    data: EligibleProduct;
}


export interface LockStatus {
    status: string;
}

export interface LockLoanResponse {
    completion: Completion;
    data: LockStatus;
}

export interface GetAdjustmentsResponse {
    completion: Completion;
    data: AdjustmentsData;
}

/**
 * 
 * 
 * @export
 * @interface Data
 */
export interface AdjustmentsData {
    base_price: number;
    final_prices: number;
    adjustments: Adjustment[];
}

/**
 * Adjustment
 * 
 * @export
 * @interface Adjustment
 */
export interface Adjustment {
    amount: number;
    summary: string;
    type: string;
    isAmountNegative?: boolean;
}


/**
 * 
 * @export
 * @interface RateSheetResponse
 */
export interface RateSheetResponse {
    completion: Completion;
    data: RateSheet;
}


/**
 * 
 * @export
 * @interface RateSheet
 */
export interface RateSheet {
    ratesheet: PriceList[];
}


/**
 * 
 * 
 * @export
 * @interface PriceList
 */
export interface PriceList {
    ratesheet_col_desc: string;
    ratesheet_col_code: string;
    price_list: number[];
}
