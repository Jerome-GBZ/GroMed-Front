import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  @Output() stepItemEvent = new EventEmitter<number>();
  disabledButton = true;

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }

  deleteItem(id: number) {
    // delete item of shopping cart
    console.log('delete item: ' + id);
  }

  acceptCondition() {
    this.disabledButton = false;
  }
}