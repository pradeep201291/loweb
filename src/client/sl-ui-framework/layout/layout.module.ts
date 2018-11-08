import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { LONavbarComponent } from './lo-nav/lo-nav.component';
import { NavbarComponent } from './nav/nav.component';

import { MenuService } from './service/menu.service';
import { SharedModule } from './../../app/shared/shared.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { InfrastructureModule } from './../infrastructure/infrastructure.module';


@NgModule({
  imports: [ BrowserModule, FormsModule, LayoutRoutingModule, SharedModule, InfrastructureModule ],
  declarations: [ HeaderComponent, LONavbarComponent, NavbarComponent ],
  exports: [ HeaderComponent, LONavbarComponent, NavbarComponent ],
  providers: [MenuService]
})
export class LayoutModule { }
