import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { CommandeTypeComponent } from './pages/commande-type/commande-type.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { AccountComponent } from './pages/account/account.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'commande-type', component: CommandeTypeComponent },
  { path: 'panier', component: ShoppingCartComponent },
  { path: 'facture', component: InvoiceComponent },
  { path: 'compte', component: AccountComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'detail/:id', component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
