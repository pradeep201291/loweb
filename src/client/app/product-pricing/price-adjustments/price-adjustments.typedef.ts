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
