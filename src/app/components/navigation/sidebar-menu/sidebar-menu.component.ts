import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
