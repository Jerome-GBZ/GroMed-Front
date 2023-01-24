import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  @Output() stepItemEvent = new EventEmitter<number>();

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }

  deleteItem(id: number) {
    // delete item of shopping cart
    console.log('delete item: ' + id);
  }
}
