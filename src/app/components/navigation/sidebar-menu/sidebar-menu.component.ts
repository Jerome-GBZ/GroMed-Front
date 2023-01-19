import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  @Input() currentItem = SidebarItem.SHOP;
  sideBarItem: typeof SidebarItem = SidebarItem;

}

export enum SidebarItem {
  SHOP = 0,
  COMMANDE_TYPE = 1,
  PANIER = 2,
  FACTURE = 3,
  COMPTE = 4
}
