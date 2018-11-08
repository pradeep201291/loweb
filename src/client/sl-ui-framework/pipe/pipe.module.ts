/**
 * 
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from './currency.pipe';

@NgModule({
    imports: [BrowserModule],
    declarations: [CurrencyPipe],
    exports: [ CurrencyPipe ],

})
export class PipeModule { }
