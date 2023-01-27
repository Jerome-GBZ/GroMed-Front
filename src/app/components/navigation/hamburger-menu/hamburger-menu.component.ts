import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {
  stateMenu: boolean = false;

  constructor() { }

  displayMenu() {
    this.stateMenu = !this.stateMenu;

    if(this.stateMenu) {
      document.getElementsByClassName("sidebar")[0].classList.add("show");
      document.getElementsByClassName("sidebar")[0].classList.remove("hide");
    } else {
      document.getElementsByClassName("sidebar")[0].classList.add("hide");
      document.getElementsByClassName("sidebar")[0].classList.remove("show");
    }
  }
}
