import { Pipe, PipeTransform } from '@angular/core';
/**
 * @todo change the pipe name
 */
@Pipe({ name: 'cur' })
export class CurrencyPipe implements PipeTransform {
    transform(value: number): string {
        let currency = value.toLocaleString();
        // check whether the number is decimal or not
        if (Math.floor(value) === value) {
            return `$${currency}`;
        }
        // else remove the decimal place and round off to the nearest integer
        let updatedValue: number = parseInt(value.toFixed(), 10);
        let totalCurrencyAmount = updatedValue.toLocaleString();
        return `$${totalCurrencyAmount}`;

    }
}
