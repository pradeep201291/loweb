import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InteractionService {

    private filterSubject: Subject<string> = new Subject<string>();
    private hideSubject: Subject<void> = new Subject<void>();
    private searchSubject: Subject<string> = new Subject<string>();
    private resetSubject: Subject<void> = new Subject<void>();
    private resetDashboard: Subject<void> = new Subject<void>();

    filterSubject$ = this.filterSubject.asObservable();
    searchSubject$ = this.searchSubject.asObservable();
    resetSubject$ = this.resetSubject.asObservable();
    resetDashboard$ = this.resetDashboard.asObservable();
    /**
     * observable for search criteria
     */
    filterSubjectBySearch$ = this.filterSubject.asObservable();

    hideSubject$ = this.hideSubject.asObservable();

    /**
     * 
     * 
     * @param {string} status
     * 
     * @memberOf InteractionService
     */
    filter(status: string) {
        this.filterSubject.next(status);
    }

    /**
     * 
     * 
     * @param {string} term
     * 
     * @memberOf InteractionService
     */
    search(term: string) {
        this.searchSubject.next(term);
    }

    hidePopover() {
        this.hideSubject.next();
    }

    /**
     * Resets the search box
     * 
     * 
     * @memberOf InteractionService
     */
    resetSearchBox() {
        this.resetSubject.next();
    }

    resetDashboardData() {
        this.resetDashboard.next();
    }
}
