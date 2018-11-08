import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router, Event } from '@angular/router';

import { MenuService } from './.././service/menu.service';
import { AuthenticationService } from './../../../sl-ui-framework/security/sl-login/shared/sl-login.authentication.service';
import { DashboardDataService } from './../../../app/shared/dashboard.data.service';
import { InteractionService } from './../../../sl-ui-framework/infrastructure/interaction.service';
import { ProductPricingService } from './../../../app/product-pricing/product-pricing.service';
import { DataStoreService } from './../../infrastructure/data-store/data-store.service';
import { AppSettings } from './../../../app/core/global-configuration/settings';
declare var $: any;


@Component({
    selector: 'sl-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
    private _isLoggedIn: boolean;

    @Input()
    set isLoggedIn(value: boolean) {
        if (value && this._isLoggedIn !== value) {
            this.isLoggedOut = false;
            this.setIdleTimeOut();
        }
        this._isLoggedIn = value;
    }
    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    @Input() logosrc: string;
    @Input() isSearchVisible: boolean;
    @Input() logoVisibility: boolean;
    private hide: boolean;
    private hideRightMenu: boolean;
    isLogin: boolean = false;
    canShowRightMenu: boolean = false;
    searchTerm: string;
    currentPage: string;
    isProductSearch: boolean;
    isScenarios: boolean;

    private idleTimeOut: number;       // 30 minutes
    private popupTimeOut: number;     // 28 minutes..
    private isIdlePopupVisible = false;
    private _idleTimer: any;
    private _idleShowPopupTimer: any;
    private isLoggedOut: boolean = false;

    constructor(private userService: AuthenticationService,
        private router: Router, private menuService: MenuService,
        private interactionService: InteractionService,
        private dashboarDataService: DashboardDataService,
        private productPricingService: ProductPricingService,
        private dataStoreService: DataStoreService,
        private appSettings: AppSettings) {
        this.hide = true;
        this.hideRightMenu = true;
    }
    /**
     * 
     * 
     * 
     * @memberOf HeaderComponent
     */
    onLogOut() {
        let userId: string;
        this.isLoggedOut = true;
        clearTimeout(this._idleTimer);
        clearTimeout(this._idleShowPopupTimer);
        let sessionDetails = this.userService.getUserSessionDetails();
        this.productPricingService.productPricingListData = null;
        sessionDetails !== null && sessionDetails.UserId ? userId = sessionDetails.UserId : userId = '';
        this.userService.logout({ UserId: sessionDetails.UserId })
            .subscribe(result => {
                if (result) {
                    this.interactionService.resetDashboardData();
                    this.dataStoreService.clearSessionStore();
                    $('#overlay').hide();
                    /**No scroll */
                    $('body').removeClass('noScroll');
                    this.router.navigate(['/login']);
                }
            },
            error => {
                this.interactionService.resetDashboardData();
                $('#overlay').hide();
                /**No scroll */
                $('body').removeClass('noScroll');
                this.dataStoreService.clearSessionStore();
                this.router.navigate(['/login']);
            });
        /**
         * @desc TODO: clear the pipeline search term on logout
         */
        if (this.dashboarDataService !== null) {
            this.dashboarDataService.SelectedLoan = null;
            this.dashboarDataService.SearchTerm = '';
            // this.dashboarDataService = null;
        }

        this.interactionService.hidePopover();
        this.router.navigate(['/login']);
    }

    /**
     * 
     */
    onHamburgerClick() {
        this.hide = !this.hide;
        this.menuService.toggle();
    }

    onRightMenuClick() {
        this.hideRightMenu = !this.hideRightMenu;
        this.menuService.toggleRightMenu();
    }

    /**
     * 
     */
    ngOnInit(): void {
        this.idleTimeOut = this.appSettings.security.idleTimeout;
        this.popupTimeOut = this.appSettings.security.popupTimeout;
        this.router.events.subscribe((val: Event) => {
            this.isProductSearch = false;
            this.isScenarios = false;
            this.isIdlePopupVisible = false;

            if (val.url === '/' || val.url === '/login') {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
            this.canShowRightMenu = false;
            if (val.url.toLowerCase().includes('pipeline/')) {
                this.canShowRightMenu = true;
            }
            if (val.url.toLowerCase().includes('dashboard')) {
                this.currentPage = 'Dashboard';
            } else if (val.url.toLowerCase().includes('/pipeline/message')) {
                this.currentPage = 'Messages';
            } else if (val.url.toLowerCase().includes('/pipeline/notification')) {
                this.currentPage = 'Notifications';
            } else if (val.url.toLowerCase().includes('/pipeline/status')) {
                this.currentPage = 'Loan Status';
            } else if (val.url.toLowerCase().includes('/pipeline/loandetails')) {
                this.currentPage = 'Loan Details';
            } else if (val.url.toLowerCase().includes('/pipeline/documents')) {
                this.currentPage = 'Documents';
            } else if (val.url.toLowerCase().includes('/pipeline/conditions')) {
                this.currentPage = 'Conditions';
            } else if (val.url.toLowerCase().includes('nav-notification')) {
                this.currentPage = 'Notifications';
            } else if (val.url.toLowerCase().includes('/pricing/scenarios')) {
                this.currentPage = 'Scenarios';
                this.isScenarios = true;
            } else if (val.url.toLowerCase().includes('/pricing/products')) {
                this.currentPage = 'Product & Pricing';
                this.isProductSearch = true;
            } else if (val.url.toLowerCase().includes('/pricing')) {
                this.currentPage = 'Product & Pricing';
            } else if (val.url.toLowerCase().includes('leaderboard')) {
                this.currentPage = 'Leader Board';
            }
            if ($('.modal-backdrop.in').is(':visible')) {
                $('.modal-backdrop.in').hide();
            }
            $('#session-expire').modal('hide');

        });

    }

    removeOverlay() {
        $('#overlay').hide();
        /**No scroll */
        $('body').removeClass('noScroll');

    }

    private setIdleTimeOut() {
        if (this.isIdlePopupVisible || this.isLoggedOut) {
            return;
        }
        if (this._idleTimer && this._idleTimer !== null) {
            clearTimeout(this._idleTimer);
        }
        if (this._idleShowPopupTimer && this._idleShowPopupTimer !== null) {
            clearTimeout(this._idleShowPopupTimer);
        }
        if (this.popupTimeOut && this.popupTimeOut !== null && this.popupTimeOut !== 0) {
            this._idleShowPopupTimer = setTimeout(this.idleEventHandler.bind(this), this.popupTimeOut);
        }
        if (this.idleTimeOut && this.idleTimeOut !== null && this.idleTimeOut !== 0) {
            this._idleTimer = setTimeout(function() {
                // console.log('idle timer');
                if (!this.isLoggedIn) {
                    return;
                }
                $('#session-expire').modal('hide');
                this.isIdlePopupVisible = false;
                this.onLogOut();
            }.bind(this), this.idleTimeOut);
        }

    }

    private idleEventHandler() {
        if (!this.isLoggedIn) {
            return;
        }
        $('#session-expire').modal('show');
        this.isIdlePopupVisible = true;
    }


    @HostListener('mousemove', ['$event'])
    @HostListener('mouseenter', ['$event'])
    @HostListener('window:scroll', ['$event'])
    @HostListener('window:click', ['$event'])
    @HostListener('window:keydown', ['$event'])
    @HostListener('window:dblclick', ['$event'])
    eventListner(e: any) {
        if (this.isLoggedIn && this.isIdlePopupVisible === false) {
            // console.log('Timer..')
            this.setIdleTimeOut();
        }
    }

    continue() {
        $('#session-expire').modal('hide');
        this.isIdlePopupVisible = false;

        this.setIdleTimeOut();
    }

}
