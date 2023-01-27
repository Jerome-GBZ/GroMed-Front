import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationPanierModel, LivraisonModel } from 'src/libs';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  @Input() total: number = 0;
  @Input() medicamentsLine: Array<PresentationPanierModel> = new Array();
  @Input() livraison: LivraisonModel | undefined;

  @Output() stepItemEvent = new EventEmitter<number>();

  options: AnimationOptions = {
    path: '/assets/lottie/delivery.json'
  };

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }
}
