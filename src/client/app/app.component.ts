import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MenuService } from './../sl-ui-framework/layout/service/menu.service';
import { PrivateLabelService } from './shared/service/private-label.service';
import { PrivateLblResponse } from './shared/service/models/GetPrivateLabelResponse';
import { AppSettingsService } from './core/app-settings.service';
import * as _ from 'lodash';
import { DataStoreService } from './../sl-ui-framework/infrastructure/data-store/data-store.service';
const defaultDomain = 'brkr.tavant.com';
const companyCode = 'company_code';

declare var $: any;

/**
 * 
 * 
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'lo-app',
    templateUrl: './app.component.html',
    styles: [require('./../../assets/styles/styles.less')],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
    headerLogo: string;
    backgroundClass: string = '';
    isLogin: boolean = false;
    authenticatedPage: string = '';
    isSearchRequired: boolean = false;
    isLogoActive: boolean;
    /*
    **
    */
    constructor(private route: Router,
        private menuService: MenuService,
        private lblService: PrivateLabelService,
        private titleService: Title,
        private settingsService: AppSettingsService,
        private dataStoreService: DataStoreService) {
    }
    /*
    **
    */
    ngOnInit(): void {
        let currentPath = this.getPathName();
        let activePath = sessionStorage.getItem('activePath');
        if (activePath && activePath !== null) {
            if (currentPath.toLowerCase() !== activePath.toLowerCase()) { this.dataStoreService.clearSessionStore(); }
        }
        this.getPriateLabelResponse();
        this.route.events.subscribe((val: Event) => {
            sessionStorage.setItem('activePath', this.getPathName());
            if (val.url === '/' || val.url === '/login') {
                this.isLogin = true;
                this.backgroundClass = 'login_bg';
                this.authenticatedPage = '';
            } else {
                this.isLogin = false;
                this.backgroundClass = '';
                // this.authenticatedPage = 'container-fluid login-body';
                this.authenticatedPage = 'container-fluid wrap summary-body body-bg';
                // If the route has changed, reset the menu visibility
                this.menuService.hide();
                this.isSearchRequired = true;
            }

            if (val.url === '/dashboard') {
                this.isSearchRequired = false;
            }
        });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    getPriateLabelResponse() {
        let response = this.lblService.getPrivateLblResponse();
        response.subscribe((data: PrivateLblResponse) => {
            let hostName = this.getLocationUrl();
            if (_.isUndefined(data[hostName])) {
                hostName = defaultDomain;
            }
            this.setTitle(data[hostName].title.text);
            this.isLogoActive = data[hostName].header.logoVisibility;
            this.headerLogo = data[hostName].header.logosrc;
            /**
            * @desc header item company code is stored in session storage
            */
            sessionStorage.setItem(companyCode, data[hostName].data.company_code);

            if (!_.isUndefined(data[hostName])) {
                let links = document.getElementsByTagName('head')[0];
                let htmlElement = document.createElement('link');
                htmlElement.setAttribute('rel', 'stylesheet');
                htmlElement.setAttribute('type', 'text/css');
                htmlElement.setAttribute('href', data[hostName].stylesheet.path);
                links.appendChild(htmlElement);
            }
        });

    }

    /**
     * 
     * 
     * @returns {string}
     * 
     * @memberOf AppComponent
     */
    getLocationUrl(): string {
        return window.location.hostname;
    }

    getPathName(): string {
        return window.location.pathname;
    }
    disableOverlay() {
        this.menuService.hide();
        this.menuService.hideRightMenu();
        $('#overlay').hide();
        /**No scroll */
        $('body').removeClass('noScroll');
    }
}
