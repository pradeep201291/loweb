/**
 * Notification page component
 * 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/forkJoin';

import { LoanInfo } from './../shared/service/models/GetMyLoansResponse';
import { NotificationService } from '../notification/notification.service';
import { Notification } from './nav-notification.model';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { PipeLineService } from '../pipeline/pipeline.service';
import { MenuService } from '../../sl-ui-framework/layout/service/menu.service';
import { PagerService } from './../../sl-ui-framework/infrastructure/pagination/pagination.service';

export enum StatusType {
    Unread = 1,
    Read = 2,
    Delete = 3
}

enum NotificationType {
    LoanNotification = 1,
    BroadCast = 4
}

@Component({
    selector: 'sl-notification',
    templateUrl: './nav-notification.page.html',
    providers: [NotificationService]
})
export class NavNotificationPage implements OnInit {
    selectedLoanNumber: string;
    src: string;
    selectedLoan: LoanInfo;
    showLoanNotification: boolean = true;
    selectAllNotification: boolean;
    loanNotifications: Notification[];
    broadCastNotifications: Notification[];
    selectedTab: string;
    private _filteredNotifications: Notification[];

    notificationCount: number;
    loanInfo: LoanInfo;
    _totalPages: Array<number>;


    /**
     * pager
     * 
     * @type {*}
     * @memberOf NavNotificationPage
     */
    pager: any = {};

    /**
     * pagedItems
     * 
     * @type {any[]}
     * @memberOf NavNotificationPage
     */
    pagedItems: any[];

    /**
     * binary
     * 
     * @type {*}
     * @memberOf NavNotificationPage
     */
    binary: any;

    /**
     * currentPage
     * 
     * @type {number}
     * @memberOf NavNotificationPage
     */
    currentPage: number = 0;

    /**
     * pagedNotifications
     * 
     * @type {Notification[]}
     * @memberOf NavNotificationPage
     */
    pagedNotifications: Notification[];

    /**
     * This is the setter for all the filteredNotifications
     * 
     * 
     * @memberOf NotificationPage
     */
    set filteredNotifications(value: Notification[]) {
        this._filteredNotifications = value;
    }


    /**
     * Read the value of filteredNotifications and get it arranged as per read and unread items.
     * 
     * @type {Notification[]}
     * @memberOf NotificationPage
     */
    get filteredNotifications(): Notification[] {
        if (this._filteredNotifications) {
            return this._filteredNotifications.sort((a, b) => {
                /**
                 * sort by unread
                 */
                if (a.status_type < b.status_type) {
                    return -1;
                }
                if (a.status_type > b.status_type) {
                    return 1;
                }
                if (a.message_date > b.message_date) {
                    return -1;
                }
                if (a.message_date < b.message_date) {
                    return 1;
                }
                if (a.message_text > b.message_text) {
                    return -1;
                }
                if (a.message_text < b.message_text) {
                    return 1;
                }
                return 0;
            });
        } else {
            return this._filteredNotifications;
        }

    }


    /**
     * Creates an instance of NotificationPage.
     * 
     * @param {NotificationService} notificationService
     * @param {ActivatedRoute} route
     * @param {DashboardDataService} dashboardDataService
     * 
     * @memberOf NotificationPage
     */
    constructor(private notificationService: NotificationService, private pipeLineService: PipeLineService,
        private route: ActivatedRoute, private dashboardDataService: DashboardDataService,
        private menuService: MenuService, private pagerService: PagerService) {
    }

    /**
     * 
     */
    ngOnInit() {
        this.selectAllNotification = false;
        this.filteredNotifications = [];
        this.notificationService
            .getBroadcastNotifications().subscribe(result => {
                this.loanNotifications = result.data.filter(e => e.notification_type === NotificationType.LoanNotification);
                this.broadCastNotifications = result.data.filter(e => e.notification_type !== 1);
                this.showNotification('loan');
            });
    }

    /**
    * This consists of the selected notifications
    * 
    * @param {Notification} notification
    * 
    * @memberOf NotificationPage
    */
    selectNotification(notification: Notification) {
        // If the select all is already checked, then uncheck the selectall checkbox
        this.selectAllNotification = !(this.filteredNotifications.filter(each => !each.isSelected).length > 0);
    }

    /**
     * This method by default selects all the notifications
     */
    selectAllNotifications() {
        if (this.filteredNotifications) {
            this.filteredNotifications.forEach(each => each.isSelected = this.selectAllNotification);
        }
    }

    canHandle(type: string) {
        if (type === 'loan') {
            return this.loanNotifications.filter(each => each.isSelected).length > 0;
        }
    }

    /**
     * This method is called to update the list of notifications whenever a read, unread or delete method is executed.
     */
    private updateList(type: StatusType) {
        if (this.filteredNotifications) {
            this.filteredNotifications.filter(each => each.isSelected)
                .forEach(each => each.status_type = type);
            this.filteredNotifications = this.filteredNotifications.filter(each => each.status_type !== StatusType.Delete);
            this.filteredNotifications.filter(each => each.isSelected = false);
            this.selectAllNotification = false;
        }
        this.pipeLineService.getTotalNotificationCount().subscribe((response) => {
            this.menuService.showTotalNotification(response.data.total_unread_count);
        });
        this.setPage(1);
    }
    /**
     * Delete selected notifications
     */
    deleteSelected() {
        /**
       * @todo change once broadcast notification features and api are stable
      */
        let selectedMessages =
            this.filteredNotifications.filter(each => each.isSelected).map(each => each.message_id);
        if (selectedMessages.length > 0) {
            this.notificationService.deleteNotification(selectedMessages).subscribe(response => {
                if (response.data.status === 'Success') {
                    this.updateList(StatusType.Delete);
                }
            });
        }
    }

    /**
     * Read selected notifications
     */
    readSelected() {
        /**
       * @todo change once broadcast notification features and api are stable
      */
        let selectedMessages =
            this.filteredNotifications.filter(each => each.isSelected).map(each => each.message_id);
        if (selectedMessages.length > 0) {
            this.notificationService.markAsRead(selectedMessages).subscribe(response => {
                if (response.data.status === 'Success') {
                    this.updateList(StatusType.Read);
                }
            });

        }
    }

    /**
     * Unread selected notifications
     */
    unreadSelected() {
        /**
       * @todo change once broadcast notification features and api are stable
      */
        let selectedMessages =
            this.filteredNotifications.filter(each => each.isSelected).map(each => each.message_id);
        if (selectedMessages.length > 0) {
            this.notificationService.markAsUnRead(selectedMessages).subscribe(response => {
                if (response.data.status === 'Success') {
                    this.updateList(StatusType.Unread);
                }
            });
        }
    }


    /**
     * showNotifications
     */
    showNotification(type: string) {
        // Reset selections.
        this.selectAllNotification = false;
        this.selectedTab = type;
        this.pager = {};
        if (type === 'broadcast') {
            this.showLoanNotification = false;
            this.filteredNotifications = this.broadCastNotifications
                .filter(each => each.status_type !== StatusType.Delete);
        } else {
            this.showLoanNotification = true;
            this.filteredNotifications = this.loanNotifications
                .filter(each => each.status_type !== StatusType.Delete
                    && each.notification_type === NotificationType.LoanNotification);
        }
        this.filteredNotifications.forEach(x => x.isSelected = false);

        this.setPage(1);
    }

    /**
     * 
     * Next page
     * 
     * @memberOf NavNotificationPage
     */
    next() {
        this.setPage(this.pager.endPage + 1, false);
    }

    /**
     * 
     * To previous page
     * 
     * @memberOf NavNotificationPage
     */
    previous() {
        this.setPage(this.pager.startPage - 1, false);
    }

    /**
     * Setting the current page for pagination
     * 
     * @param {number} page
     * 
     * @memberOf NavNotificationPage
     */
    setCurrentPage(page: number) {
        this.currentPage = page;
        this.setPage(page);
    }

    /**
     * Set the pagination based on the record
     * 
     * @param {number} page
     * @param {boolean} [withinTheFrame=true]
     * 
     * @memberOf NavNotificationPage
     */
    setPage(page: number, withinTheFrame = true) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.filteredNotifications.length, page, withinTheFrame);
        this.pagedNotifications = this.filteredNotifications.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.currentPage = this.pager.currentPage;
    }
}
