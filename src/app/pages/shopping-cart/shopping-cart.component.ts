import { Component, ElementRef, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  stepShop: number = 1;
  width: number = window.innerWidth;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  onStepChange(value: number) {
    this.stepShop = value;
  }
}
