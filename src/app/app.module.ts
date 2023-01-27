import { AuthService } from 'src/app/auth/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarMenuComponent } from './components/navigation/sidebar-menu/sidebar-menu.component';
import { HamburgerMenuComponent } from './components/navigation/hamburger-menu/hamburger-menu.component';
import { LineComponent } from './components/shopping-cart/line/line.component';
import { StepsComponent } from './components/shopping-cart/steps/steps.component';
import { Step1Component } from './components/shopping-cart/step1/step1.component';
import { Step2Component } from './components/shopping-cart/step2/step2.component';
import { Step3Component } from './components/shopping-cart/step3/step3.component'

import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CommandeTypeComponent } from './pages/commande-type/commande-type.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { AccountComponent } from './pages/account/account.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ShopComponent } from './pages/shop/shop.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiModule } from "../libs";
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(): any {  
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    SidebarMenuComponent,
    CommandeTypeComponent,
    ShoppingCartComponent,
    InvoiceComponent,
    AccountComponent,
    WelcomeComponent,
    LoginComponent,
    HamburgerMenuComponent,
    StepsComponent,
    LineComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ProductDetailsComponent,
    ShopCardComponent
  ],
  imports: [
    ApiModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    MatGridListModule,
    PaginatorModule,
    MatDialogModule,
    TooltipModule,
    BadgeModule,
    TableModule,
    SkeletonModule,
    ToastModule,
    BrowserAnimationsModule,
    RippleModule,
    AutoCompleteModule,
    CheckboxModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
