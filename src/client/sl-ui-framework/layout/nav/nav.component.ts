import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuService } from './.././service/menu.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
/**
 * Component for Navbar
 */
@Component({
    selector: 'right-nav',
    templateUrl: 'nav.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {

    private showMenu: boolean = false;
    private componentDestroyed: Subject<void>;

    /**
     * Constructor 
     * @param {MenuService} menuService
     */
    constructor(private menuService: MenuService) {
    }



    ngOnInit() {
        this.componentDestroyed = new Subject<void>();
        // Subscription when the menu is on the header
        this.menuService.toggleRightMenu$.takeUntil(this.componentDestroyed).subscribe(() => {
            this.toggleMenu();
        });

        this.menuService.hideRightMenu$.subscribe(() => {
            this.showMenu = false;
        });
    }

    private toggleMenu() {
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


    ngOnDestroy() {
        this.componentDestroyed.next();
    }

}
