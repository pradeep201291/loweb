import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './shared/sl-login.authentication.service';
import { User } from './shared/sl-login.user';
import { LoginAppConstants } from './shared/sl-login.constants';
import { AppSettings } from './../../../app/core/global-configuration/settings';

@Component({
    selector: 'sl-login',
    templateUrl: 'sl-login.component.html'
})

export class LoginComponent implements OnInit {

    validationVisibility: boolean = true;
    emailErr: boolean = true;
    pwdErr: boolean = true;
    rsaErr: boolean = true;
    isRsaValid: boolean = false;
    user: User;
    stearnsContacttrustedUrl: any;
    isAuthenticated = false;
    isRsaEnabled: boolean;

    loginForm: FormGroup;

    loginFormErrors = {
        'userName': '',
        'password': '',
        'rsaToken': ''
    };


    ErrorMessages = {
        'userName': {
            'required': 'Please enter the User Id.'
        },
        'password': {
            'required': 'Please enter the Password.'
        },
        'rsaToken': {
            'required': 'Please enter the RSA Token.'
        },
        'serverError': {
            'invalid_grant': {
                'control': 'password',
                'message': 'The User Id or Password is incorrect.'
            },
            '64': {
                'control': 'rsaToken',
                'message': 'Invalid RSA Token'
            }
        }
    };

    /*
    ** DomSanitizer is used for by passing sewcurity
    ** AuthenticationService for user validation 
    ** Router for page navigation
    ** LoginAppConstants for application constants
    */
    constructor(private sanitizer: DomSanitizer,
        private userService: AuthenticationService,
        private router: Router,
        private appSettings: AppSettings, private formBuilder: FormBuilder) {
        this.stearnsContacttrustedUrl = sanitizer.bypassSecurityTrustResourceUrl(LoginAppConstants.contactURL);
    }

    ngOnInit() {
        this.isRsaEnabled = this.appSettings.security.isRsaEnabled;
        if (sessionStorage.getItem(LoginAppConstants.current_user)) {
            this.router.navigate(['/dashboard']);
        }
        this.buildForm();
    }

    private resetErrors() {
        this.loginFormErrors = {
            'userName': '',
            'password': '',
            'rsaToken': ''
        };
    }


    private buildForm() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            rsaToken: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(data => {
            this.resetErrors();
        });
    }

    /**
     * 
     * 
     * 
     * @memberOf LoginComponent
     */
    onSubmit() {
        if (this.loginForm.valid) {
            this.userService.login({
                grant_type: 'password',
                username: this.loginForm.controls['userName'].value.trim(),
                password: this.loginForm.controls['password'].value.trim(),
                rsaToken: this.loginForm.controls['rsaToken'].value.trim(),
            })
                .subscribe(result => {
                    if (result === true) {
                        // login successful
                        this.router.navigate(['/dashboard']);
                    } else {
                        // login failed
                        this.user = { email: '', password: '' };
                        this.validationVisibility = false;
                    }
                },
                error => {
                    this.loginForm.patchValue({
                        userName: '',
                        password: '',
                        rsaToken: ''
                    });
                    this.resetErrors();
                    console.log(error);
                    if (error.error && error.error_description) {
                        let errInfo = this.ErrorMessages['serverError'][error.error];
                        this.loginFormErrors[errInfo.control] = errInfo.message;
                    }
                });
        } else {
            for (const field in this.loginFormErrors) {
                if (this.loginFormErrors.hasOwnProperty(field)) {
                    this.loginFormErrors[field] = '';
                    const control = this.loginForm.get(field);
                    if (control && !control.valid) {
                        for (const key in control.errors) {
                            if (control.errors.hasOwnProperty(key)) {
                                this.loginFormErrors[field] = this.ErrorMessages[field][key];
                                break;
                            }
                        }

                    }
                }
            }
        }

    }
}

