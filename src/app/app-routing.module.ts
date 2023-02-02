import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CommandeTypeComponent } from './pages/commande-type/commande-type.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent, canActivate: [AuthService] },
  { path: 'detail/:id', component: ProductDetailsComponent, canActivate: [AuthService] },
  { path: 'commande-type', component: CommandeTypeComponent, canActivate: [AuthService] },
  { path: 'panier', component: ShoppingCartComponent, canActivate: [AuthService] },
  { path: 'facture', component: InvoiceComponent, canActivate: [AuthService] },
  { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
