import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  @Output() stepItemEvent = new EventEmitter<number>();

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }
}
