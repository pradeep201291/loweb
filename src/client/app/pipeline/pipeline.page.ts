import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeLineService } from './pipeline.service';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { MenuService } from '../../sl-ui-framework/layout/service/menu.service';
import { MessageService } from './../message/shared/message-page.service';
import { DocumentService } from '../documents/documents.service';

declare var $: any;

/**
 *  The main pipeline view component.
 * The service will be called from this component and will be shared to the child components
 */
@Component({
    selector: 'sl-pipeline',
    templateUrl: './pipeline.page.html',
})
export class PipelinePage implements OnInit {
    currentPage: string;
    notificationCount: number = 0;
    messageCount: number = 0;
    private hideRightMenu: boolean;

    /**
     * selectedLoanNumber
     * 
     * @type {string}
     * @memberOf PipelinePage
     */
    selectedLoanNumber: string;

    private showMenu: boolean = false;
    /**
     * Creates an instance of PipelinePage.
     * 
     * @param {ActivatedRoute} activatedRoute
     * 
     * @memberOf PipelinePage
     */
    constructor(private router: Router, private pipeLineService: PipeLineService, private documentService: DocumentService,
        private dashboardDataService: DashboardDataService, private menuService: MenuService, private messageService: MessageService) {

    }

    ngOnInit() {
        let loan = this.dashboardDataService.SelectedLoan;
        if (loan) {
            this.selectedLoanNumber = this.dashboardDataService.SelectedLoan.loan_num;
        } else {
            this.router.navigate(['/dashboard']);
        }
        this.router.events.subscribe(evt => {
            let navigatedUrl = evt.url.toLowerCase();
            switch (navigatedUrl) {
                case '/pipeline/status':
                    this.currentPage = 'Status';
                    break;
                case '/pipeline/notification':
                    this.currentPage = 'Notifications';
                    break;
                case '/pipeline/loandetails':
                    this.currentPage = 'Loan Details';
                    break;
                case '/pipeline/conditions':
                    this.currentPage = 'Condition List';
                    break;
                case '/pipeline/message':
                    this.currentPage = 'Message';
                    break;
                case '/pipeline/documents':
                    this.currentPage = 'View Documents';
                    break;
            }
        });
        if (loan) {
            this.pipeLineService.getConditionListDetails(loan.loan_num, loan.src)
                .subscribe((response) => {
                    this.menuService.showNotification(response.data.total_unread_count);
                });

            this.messageService.getUnreadCount(loan.src, loan.loan_num)
                .subscribe(response => {
                    this.menuService.showMessage(response.data.total_unread_count);
                });

        }

        this.menuService.notification$.subscribe((count) => {
            this.notificationCount = count;
        });

        this.menuService.message$.subscribe((count) => {
            this.messageCount = count;
        });

        this.menuService.toggleRightMenu$.subscribe(() => {
            this.toggleMenu();
        });

        this.menuService.hideRightMenu$.subscribe(() => {
            this.showMenu = false;
        });
    }

    /**
     * MENU SCROLLABLE
     * 
     * 
     * @memberOf PipelinePage
     */
    // ngAfterViewChecked() {
    //     if (this.showMenu) {
    //         let windowHeight = $(window).height();
    //         if (windowHeight < 500) {
    //             $('.right-nav').css({ 'position': 'absolute' });
    //             if ($(window).scrollTop() >= 200) {
    //                 $(window).scrollTop(200);
    //             }
    //         }
    //     }else {
    //         $('.right-nav').css({ 'position': 'fixed' });
    //     }
    // }

    private toggleMenu() {
        this.showMenu = !this.showMenu;
        if (this.showMenu) {
            $('#overlay').show();
            /**No scroll */
            $('body').addClass('noScroll');
        }
    }


    onRightMenuClick() {
        this.hideRightMenu = !this.hideRightMenu;
        this.menuService.toggleRightMenu();
    }

    disableOverlay() {
        this.documentService.isDocumentUploaded = false;
        // this.menuService.hide();
        this.menuService.hide();
        this.menuService.hideRightMenu();
        $('#overlay').hide();
        /**No scroll */
        $('body').removeClass('noScroll');
    }
}
