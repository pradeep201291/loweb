import { Pipe, PipeTransform } from '@angular/core';

/**
 * Remove minus and add brackets
 * 
 * @export
 * @class UTCDatePipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'MinusConversion' })
export class MinusConversion implements PipeTransform {
    transform(value: string): string {
        let floatValue = parseFloat(value).toFixed(3);
        if (floatValue.toString().includes('-')) {
            value = floatValue.toString().substring(1, 15);
            value = '(' + value + ')';
        } else {
            value = floatValue.toString();
        }
        return value;
    }
}
