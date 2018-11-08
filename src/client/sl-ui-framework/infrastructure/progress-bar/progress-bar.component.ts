
import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.component.html',
})
export class ProgressBarComponent implements OnInit {
    @Input() isLoading: boolean;

    constructor(private progressBarService: ProgressBarService) {

    }

    ngOnInit() {
       // this.progressBarService.loadingSubject$.subscribe(isLoading => this.isLoading = isLoading);
    }

}
