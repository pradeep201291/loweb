/**
 * @author: Tavant Technologies
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
/**
 * This service will be used for sharing the events 
 * between Header and  navigation components
 */
export class MenuService {
    private toggleMenu: Subject<void> = new Subject<void>();
    private hideMenu: Subject<void> = new Subject<void>();
    private toggleRight: Subject<void> = new Subject<void>();

    private notificationSubject: Subject<number> = new Subject<number>();
    private totalNotificationSubject: Subject<number> = new Subject<number>();
    private messageSubject: Subject<number> = new Subject<number>();
    private hideRight: Subject<void> = new Subject<void>();

    toggleMenu$ = this.toggleMenu.asObservable();
    hideMenu$ = this.hideMenu.asObservable();
    toggleRightMenu$ = this.toggleRight.asObservable();
    notification$ = this.notificationSubject.asObservable();
    totalNotification$ = this.totalNotificationSubject.asObservable();
    message$ = this.messageSubject.asObservable();
    hideRightMenu$ = this.hideRight.asObservable();

    /**
     * The toggle method
     */
    toggle() {
        this.toggleMenu.next();
    }

    /**
     * Hide the menu always. Used by router events. i.e. if the page is navigated to a new page, then hide the menu.
     */
    hide() {
        this.hideMenu.next();
    }

    hideRightMenu() {
        this.hideRight.next();
    }

    toggleRightMenu() {
        this.toggleRight.next();
    }

    /**
     * Shows notification badge.
     */
    showNotification(count: number) {
        this.notificationSubject.next(count);
    }

    showTotalNotification(count: number) {
        this.totalNotificationSubject.next(count);
    }

    showMessage(count: number) {
        this.messageSubject.next(count);
    }
}
