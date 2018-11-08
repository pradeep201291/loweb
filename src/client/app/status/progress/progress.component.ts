import { Component, Input } from '@angular/core';
import { CdProgress } from './../status.model';
/**
 * 
 */
@Component({
    selector: 'lo-status-progress',
    templateUrl: './progress.component.html'
})
export class StatusProgressComponent {
    @Input() progress: CdProgress[];
}
