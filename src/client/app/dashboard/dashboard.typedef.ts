/**
 * 
 * 
 * @export
 * @interface GetScenarioPipelineRequest
 */
export interface GetScenarioPipelineRequest {
    borrower_name: string;
    page_size: number;
    page_number: number;
}


/**
 * 
 * 
 * @export
 * @interface Completion
 */
export interface Completion {
    c: number;
    v: string;
}

/**
 * 
 * 
 * @export
 * @interface GetScenarioPipelineResponse
 */
export interface GetScenarioPipelineResponse {
    completion: Completion;
    data: PriceQuote[];
}


/**
 * 
 * 
 * @export
 * @interface PriceQuote
 */
export interface PriceQuote {
    price_quote_id: number;
    borrower_name: string;
    scenario_count: number;
    loan_amount: number;
    ltv: number;
    created_date: string;
    modified_date: string;
}
