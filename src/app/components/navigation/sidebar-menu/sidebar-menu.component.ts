import { UtilisateurModel } from 'src/libs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  @Input() currentItem = SidebarItem.SHOP;
  sideBarItem: typeof SidebarItem = SidebarItem;
  width: number = window.innerWidth;
  utilisateur: UtilisateurModel;

  constructor(public authService: AuthService) {
    this.utilisateur = this.authService.getUtilisateur()!!;

    this.authService.utilisateurObservable.subscribe(
      (value: UtilisateurModel) => {
        this.utilisateur = value;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  logout() {
    this.authService.logout();
  }
}

export enum SidebarItem {
  SHOP = 0,
  COMMANDE_TYPE = 1,
  PANIER = 2,
  COMMANDE = 3,
  COMPTE = 4,
  DECONECTE = 5
}
