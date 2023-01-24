import { Component, Input } from '@angular/core';
import { PresentationCardModel } from 'src/libs';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent {
  @Input() presentationCard : PresentationCardModel | undefined
}
