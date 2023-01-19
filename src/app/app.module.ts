import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ShopComponent } from './pages/shop/shop.component';
import { SidebarMenuComponent } from './components/navigation/sidebar-menu/sidebar-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    SidebarMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
