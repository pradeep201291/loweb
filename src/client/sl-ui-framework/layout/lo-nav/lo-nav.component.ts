import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuService } from './.././service/menu.service';

import { AuthenticationService } from './../../security/sl-login/shared/sl-login.authentication.service';
import { DashboardDataService } from './../../../app/shared/dashboard.data.service';
import { InteractionService } from './../../../sl-ui-framework/infrastructure/interaction.service';

import { ProductPricingService } from './../../../app/product-pricing/product-pricing.service';
import { DataStoreService } from './../../infrastructure/data-store/data-store.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

/**
 * Component for Navbar
 */
@Component({
    selector: 'sl-lo-nav',
    templateUrl: 'lo-nav.component.html',
})
export class LONavbarComponent implements OnInit, OnDestroy {

    private showMenu: boolean = false;
    private totalNotificationCount: number = 0;
    userName: string = '';
    role: string = '';
    private componentDestroyed: Subject<void>;

    /**
     * Constructor 
     * @param {MenuService} menuService
     */
    constructor(private userService: AuthenticationService,
        private router: Router, private menuService: MenuService,
        private interactionService: InteractionService,
        private dashboarDataService: DashboardDataService,
        private productPricingService: ProductPricingService,
        private dataStoreService: DataStoreService) {
    }


    onLogOut() {
        this.removeOverlay();
        let userId: string;
        let sessionDetails = this.userService.getUserSessionDetails();
        this.productPricingService.productPricingListData = null;
        sessionDetails !== null && sessionDetails.UserId ? userId = sessionDetails.UserId : userId = '';
        this.userService.logout({ UserId: sessionDetails.UserId })
            .subscribe(result => {
                if (result) {
                    this.interactionService.resetDashboardData();
                    this.dataStoreService.clearSessionStore();
                    this.router.navigate(['/login']);
                }
            },
            error => {
                this.interactionService.resetDashboardData();
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
     * Toggles the visibility of the menu
     */
    toggleMenu() {
        this.showMenu = !this.showMenu;
        if (this.showMenu) {
            $('#overlay').show();
            /**No scroll */
            $('body').addClass('noScroll');
        } else {
            $('#overlay').hide();
            /**No scroll */
            $('body').removeClass('noScroll');
        }
    }

    ngOnInit() {
        this.componentDestroyed = new Subject<void>();
        // Subscription when the menu is on the header
        this.menuService.toggleMenu$.takeUntil(this.componentDestroyed).subscribe(() => {
            this.toggleMenu();
        });

        this.menuService.hideMenu$.takeUntil(this.componentDestroyed).subscribe(() => {
            this.showMenu = false;
        });

        this.menuService.totalNotification$.takeUntil(this.componentDestroyed).subscribe((count) => {
            this.totalNotificationCount = count;
        });

        if (this.dataStoreService.getUserFromSession() !== null) {
            let userDetails = this.dataStoreService.getUserFromSession();
            this.userName = userDetails.userName;
            this.role = userDetails.role;
        }

    }

    // ngAfterViewChecked(){
    //      if (this.showMenu){
    //          /**MENU SCROLLABLE */
    //         var windowHeight = $( window ).height();
    //             if(windowHeight < 500){
    //                 $('.left-nav').css('position','absolute');
    //                 if($(window).scrollTop() >= 200){ 
    //                 $(window).scrollTop(200); 
    //             }
    //         }
    //      }
    // }

    ngOnDestroy() {
        this.componentDestroyed.next();
    }

    removeOverlay() {
        $('#overlay').hide();
        /**No scroll */
        $('body').removeClass('noScroll');
    }

    disableOverlay() {
        // this.menuService.hide();
        this.menuService.hide();
        this.menuService.hideRightMenu();
        $('#overlay').hide();
        /**No scroll */
        $('body').removeClass('noScroll');
    }
}
