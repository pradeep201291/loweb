import { Component, Input } from '@angular/core';
import { MajorEvent } from './../status.model';
/**
 * 
 */
@Component({
    selector: 'lo-status-major-events',
    templateUrl: './major-events.component.html'
})
export class StatusMajorEventsComponent {
    @Input() majorEvents: MajorEvent[];

    constructor() {
    }
}
