
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

/**
 * 
 * 
 * @export
 * @interface SelectedPriceList
 */
export class SelectedPriceList {
    ratesheet_col_desc: string;
    selected_price_list: string;
    id?: number;
}

