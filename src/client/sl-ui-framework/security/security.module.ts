import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './sl-login/sl-login.component';
import { AuthorizationGuard } from './sl-login/shared/sl-login.guard';
import { AuthenticationService } from './sl-login/shared/sl-login.authentication.service';

import { CommunicationModule } from './../communication/communication.module';
/*
**
*/
@NgModule(
    {
      imports: [ BrowserModule, FormsModule, CommunicationModule, ReactiveFormsModule, ],
      declarations : [ LoginComponent ],
      providers :  [ AuthenticationService, AuthorizationGuard ]
    }
)
/*
**
*/
export class SecurityModule {}
