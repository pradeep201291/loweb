import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { NotificationPage } from './notification.page';
import { NotificationService } from './notification.service';
import { NotificationForLoanResponse } from './notification.model';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { PipeLineService } from '../pipeline/pipeline.service';
import { MenuService } from '../../sl-ui-framework/layout/service/menu.service';
import { DateFormatPipe } from './notification.dateformat.pipe';
import { StearnsHttpClient } from './../../sl-ui-framework/infrastructure/http-client/http-client.service';
import { AppSettings } from './../core/global-configuration/settings';
import { Loan } from './../shared/loan-info.model';



let comp: NotificationPage;
let fixture: ComponentFixture<NotificationPage>;
let de: DebugElement;
let el: HTMLElement;
let dashboardDataService: DashboardDataService;
let pipeLineService: PipeLineService;
let menuService: MenuService;
let stearnsHttpClient: StearnsHttpClient;
let appSettings: AppSettings;
let activatedRoute: ActivatedRoute;
let loan: Loan = {
    src: '1',
    loan_num: '1234',
    status: '',
    status_code: '',
    prop_address: '',
    prop_city: '',
    prop_state: '',
    prop_zip: '',
    borrower: '',
    loan_amt: '',
    app_date: '',
    lock_date: '',
    lock_exp_date: '',
    est_closing_date: '',
    occupancy: '',
    loan_purpose: '',
    loan_term: '',
    uw_decision_exp_date: '',
    initial_disc_date: '',
    closing_disc_date: '',
    doc_sent_date: '',
    loan_program_name: '',
    rate: '',
    borrowers: [],
};

dashboardDataService = new DashboardDataService();
dashboardDataService.SelectedLoan = loan;

describe('NotificationPage:', () => {

    beforeEach(async(() => {
        let mockNotificationService = {
            getNotificationDetailsForLoan: () => {
                let result: NotificationForLoanResponse = {
                    completion: {
                        c: 5,
                        v: '',
                    },
                    data: [{
                        message_id: 1,
                        notification_type: 1,
                        status_type: 1,
                        message_text: 'first notification',
                        link: '',
                        message_date: new Date(),
                        isSelected: true
                    },
                    ],
                };
                return Observable.of(result);
            }
        };
        TestBed.configureTestingModule({
            declarations: [NotificationPage, DateFormatPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: DashboardDataService, useValue: dashboardDataService },
                { provide: PipeLineService, useValue: pipeLineService },
                { provide: MenuService, useValue: menuService },
                { provide: StearnsHttpClient, useValue: stearnsHttpClient },
                { provide: AppSettings, useValue: appSettings },
                { provide: ActivatedRoute, useValue: activatedRoute }
            ]
        })
            .overrideComponent(NotificationPage, {
                set: {
                    providers: [
                        { provide: NotificationService, useValue: mockNotificationService }
                    ]
                }
            })

            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationPage);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('div'));
        el = de.nativeElement;
        fixture.detectChanges(); // trigger initial data binding
    });


    it('should be readly initialized', () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
        expect(comp.loanInfo.loan_num).toBe('1234');
    });

    it('should have proper loaninfo', () => {
        expect(comp.loanInfo.loan_num).toBe('1234');
        expect(comp.loanInfo.src).toBe('1');
    });

    it('should have OnInit Completed', () => {
        expect(comp.loanNotifications.length).toBe(1);
        expect(comp.loanNotifications[0].message_text).toBe('first notification');
        expect(comp.loanNotifications[0].isSelected).toBe(true);
        expect(comp.filteredNotifications.length).toBe(1);
    });
});

describe('NotificationPage with no active loan:', () => {

    beforeEach(async(() => {
        let mockNotificationService = {
            getNotificationDetailsForLoan: () => {
                let result: NotificationForLoanResponse = {
                    completion: {
                        c: 5,
                        v: '',
                    },
                    data: [{
                        message_id: 1,
                        notification_type: 4,
                        status_type: 1,
                        message_text: 'first notification',
                        link: '',
                        message_date: new Date(),
                        isSelected: true
                    },
                    ],
                };
                return Observable.of(result);
            }
        };
        TestBed.configureTestingModule({
            declarations: [NotificationPage, DateFormatPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: DashboardDataService, useValue: dashboardDataService },
                { provide: PipeLineService, useValue: pipeLineService },
                { provide: MenuService, useValue: menuService },
                { provide: StearnsHttpClient, useValue: stearnsHttpClient },
                { provide: AppSettings, useValue: appSettings },
                { provide: ActivatedRoute, useValue: activatedRoute }
            ]
        })
            .overrideComponent(NotificationPage, {
                set: {
                    providers: [
                        { provide: NotificationService, useValue: mockNotificationService }
                    ]
                }
            })

            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationPage);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('div'));
        el = de.nativeElement;
        fixture.detectChanges(); // trigger initial data binding
    });

    it('should have OnInit Completed', () => {
        expect(comp.loanNotifications.length).toBe(1);
        expect(comp.loanNotifications[0].message_text).toBe('first notification');
        expect(comp.loanNotifications[0].isSelected).toBe(true);
        expect(comp.filteredNotifications.length).toBe(0);
    });
});
