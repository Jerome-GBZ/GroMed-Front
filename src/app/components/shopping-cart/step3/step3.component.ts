import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationPanierModel } from 'src/libs';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  @Input() total: number = 0;
  @Input() medicamentsLine: Array<PresentationPanierModel> = new Array();

  @Output() stepItemEvent = new EventEmitter<number>();

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }
}
