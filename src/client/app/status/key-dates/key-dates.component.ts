import { Component, Input } from '@angular/core';
import { KeyDate } from './../status.model';
/**
 * 
 */
@Component({
    selector: 'lo-status-key-date',
    templateUrl: './key-dates.component.html'
})
export class StatusKeyDatesComponent {
    @Input() keyDates: KeyDate[];
}
