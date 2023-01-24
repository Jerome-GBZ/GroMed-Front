import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ShopComponent } from './pages/shop/shop.component';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarMenuComponent } from './components/navigation/sidebar-menu/sidebar-menu.component';
import { HamburgerMenuComponent } from './components/navigation/hamburger-menu/hamburger-menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PaginatorModule } from 'primeng/paginator';
import { CommandeTypeComponent } from './pages/commande-type/commande-type.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { AccountComponent } from './pages/account/account.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { MatDialogModule } from '@angular/material/dialog'
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


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
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    MatGridListModule,
    PaginatorModule,
    MatDialogModule,
    BadgeModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
