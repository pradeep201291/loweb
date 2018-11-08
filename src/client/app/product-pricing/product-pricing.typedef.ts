import { PriceList } from './price-list/price-list.typedef';
import { Adjustment } from './price-adjustments/price-adjustments.typedef';
import { Scenario } from './scenario-details/scenario-details.typedef';

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
 * @interface PriceItEnum
 */
export interface PriceItEnum {
    t: string;
    v: string;
    s: number;
}

/**
 * 
 * 
 * @export
 * @interface PriceItEnumListData
 */
export interface PriceItEnumListData {
    property_name: string;
    enums: PriceItEnum[];
}

/**
 * 
 * 
 * @export
 * @interface PriceItEnumResponse
 */
export interface PriceItEnumResponse {
    completion: Completion;
    data: PriceItEnumListData[];
}



/**
 * 
 * 
 * @export
 * @interface EnumtypeList
 */
export interface EnumtypeList {
    enum_type: string[];
}

/**
 * 
 * 
 * @export
 * @interface PriceItenumType
 */
export interface PriceItenumType {
    completion: Completion;
    data: EnumtypeList;
}

/**
 * 
 * 
 * @export
 * @class ProductPricingList
 */
export interface ProductPricingList {
    loanFICO: number;
    propertyZIP: number;
    purchaseMarketValue: number;
    ltv: number;
    loanAmount: number;
    loanPurpose: string;
    occupacy: string;
    propertyType: string;
    impounds: string;
    lockTerm: string;
    rate: number;
    bestEx: string;
    amort_type_arm: boolean;
    amort_type_fixed: boolean;
    amortTerm: string;
    loan_type_conv: boolean;
    loan_type_fha: boolean;
    loan_type_va: boolean;
    docType: string;
    propertyState: string;
    country: string;
    citizenship: string;
    existigNewTD: number;
    stearnsFinancedRefi: string;
    totatEstQMFees: number;
    cltv: number;
    ausResult: string;
    mortgageInsurance: string;
    dti: number;
    firstTimeHouseBuyer: string;
    priceQuoteId: number;
    firstName: string;
    lastName: string;

}

/**
 * 
 * @export
 * @interface GetPriceItRequest
 */
export interface GetRateSheetRequest {
    price_it_input: GetPriceItInput;
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
 * @interface GetPriceItRequest
 */
export interface GetPriceItRequest {
    price_it_input: GetPriceItInput;
}

/**
 * 
 * 
 * @export
 * @class GetPriceItInput
 */
export class GetPriceItInput {
    fico: string;
    zip: string;
    market_value: string;
    ltv: string;
    loan_amt: string;
    loan_purpose: string;
    occ: string;
    prop_type: string;
    impounds: string;
    doc_type: string;
    prop_county: string;
    prop_state: string;
    citizen: string;
    exist_second: string;
    refi_has_imp: string;
    cltv: string;
    aus_result: string;
    lock_term: string;
    dti: string;
    rate: string;
    amort_term: string;
    amort_type_fixed: string;
    amort_type_arm: string;
    loan_type_conv: string;
    loan_type_fha: string;
    loan_type_va: string;
    last_name: string;
    first_name: string;
    fthb: string;
    mortgage_ins: string;
    plan_id: string;
    loan_num: string;
    best_ex: string;
}



/**
 * 
 * 
 * @export
 * @interface EligibleProduct
 */
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

/**
 * 
 * 
 * @export
 * @interface FailReason
 */
export interface FailReason {
    reason: string;
}

/**
 * 
 * 
 * @export
 * @interface IneligibleProduct
 */
export interface IneligibleProduct {
    product_name: string;
    fail_reasons: FailReason[];
}

/**
 * 
 * 
 * @export
 * @interface Data
 */
export interface ProductsData {
    eligible_products: EligibleProduct[];
    ineligible_products: IneligibleProduct[];
}

/**
 * 
 * 
 * @export
 * @interface PriceItResponse
 */
export interface PriceItResponse {
    completion: Completion;
    data: ProductsData;
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
 * 
 * 
 * @export
 * @interface PriceItAdjustmentsResponse
 */
export interface PriceItAdjustmentsResponse {
    completion: Completion;
    data: AdjustmentsData;
}

/**
 * @export
 * @interface SaveScenarioRequest
 */
export interface SaveScenarioRequest {
    price_quote_id: number;
    price_it_input: GetPriceItInput;
}

/**
 * @export
 * @interface SaveScenarioResponse
 */
export interface SaveScenarioResponse {
    completion: Completion;
    data: string;
}


/**
 * @export
 * @interface ScenarioDetailsData
 */
export interface ScenarioDetailsData {
    borrower_name: string;
    price_it_input: GetPriceItInput;
    price_quote_details: Scenario;
}

/**
 * @export
 * @interface ScenarioDetailsResponse
 */
export interface ScenarioDetailsResponse {
    completion: Completion;
    data: ScenarioDetailsData;
}


/**
 * @export
 * @interface ScenarioDetailsRequest
 */
export class ScenarioDetailsRequest {
    price_quote_id: number;
    borrower_name: string;
    page_size: number;
    page_number: number;
}

export interface ValidateZip {
    city: string;
    state: string;
    zip: string;
    area_code: string;
    county_code: string;
    county: string;
}

export interface ZIpCodeResponse {
    completion: Completion;
    data: ValidateZip[];
}
