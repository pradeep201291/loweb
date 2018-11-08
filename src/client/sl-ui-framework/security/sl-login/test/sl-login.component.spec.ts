import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Router } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LoginComponent } from './../sl-login.component';
import { AuthenticationService } from './.././shared/sl-login.authentication.service';
import { User } from './.././shared/sl-login.user';

let fixture: ComponentFixture<LoginComponent>;
let comp: LoginComponent;
let de: DebugElement;
let el: HTMLElement;
let RouterStub: any;
let rootService: any;
let authStubService: any;
interface SafeValue {
}
interface SafeResourceUrl extends SafeValue {
}

///Delete
describe('test', () => {
    it('Should be a pass test', () => {
    expect(2 + 3).toEqual(5, 'should pass');
    });
});

describe('Test suite for login component', () => {

    beforeEach( async(() => {

    class Sanitizer {
        bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
                return 'url';
        }
    }

    authStubService = {
                login: function(User: User){
                    return true;
                },
                logout: function(){
                    return false;
                }
            };

    TestBed.configureTestingModule({
        imports: [ FormsModule ],
                declarations: [ LoginComponent ],
                providers: [ { provide: DomSanitizer, useClass: Sanitizer},
                            { provide: AuthenticationService, useValue: authStubService},
                            { provide: Router, useClass: RouterStub}]
    })
    .overrideComponent(LoginComponent, {
                set: {
                template: require('./../sl-login.component.html')
                }
            })
    .compileComponents()
    .then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            // fixture.componentInstance.contactURL = 'testurl';
            comp = fixture.componentInstance;
            rootService = TestBed.get(AuthenticationService);
    });
    }));

    // it('Test component instance instance', () => {
    //     expect(comp instanceof LoginComponent).toBe(true, 'should create instance');
    // });

    // it('Test Service instance', () => {
    //     expect(rootService === AuthenticationService).toBe(false, 'should not be equal');
    // });

    // it('Test service call', inject([AuthenticationService], (auth: AuthenticationService) => {
    //    expect(auth.login(new User('xyz@admin.com', 'a101'))).toBe(true, 'auth should pass');
    // }));

    //  xit('Test user validation', inject([AuthenticationService, Router], (auth: AuthenticationService, route: Router) => {
    //    spyOn(route, 'navigate').and.returnValue(true);
    //    fixture.componentInstance.validateLoggedInUser(new User('xyz@admin.com', 'a101'), true);
    //    expect(fixture.componentInstance.isAuthenticated).toBe(true, 'auth should pass');
    //    expect(fixture.componentInstance.validationVisibility).toBe(true, 'Err visibility should pass');
    //  }));

     xit('Test user validation', () => {
        rootService = TestBed.get(AuthenticationService);
        fixture.detectChanges();
        expect(this.rootService.login(new User('xyz@admin.com', 'a101'))).toBeTruthy('auth should pass');
    });


    xit('Test', () => {
        de = fixture.debugElement.query(By.css('h3'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('welcome', 'html element test');
    });

    xit('Test contact url', () => {
        fixture.detectChanges();
        expect(comp.stearnsContacttrustedUrl === null).toBe(false, 'should not be null');
    });

    xit('Test contact url binding', () => {
        de = fixture.debugElement.query(By.css('touch-link'));
        fixture.detectChanges();
        expect(comp.stearnsContacttrustedUrl === null).toBe(false, 'should not be null');
    });

    xit('Test contact url binding', () => {
        de = fixture.debugElement.query(By.css('touch-link'));
        fixture.detectChanges();
        expect(comp.stearnsContacttrustedUrl === null).toBe(false, 'should not be null');
    });

});
