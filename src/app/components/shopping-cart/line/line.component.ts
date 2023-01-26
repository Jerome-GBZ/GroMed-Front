import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationPanierModel } from 'src/libs';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  VariantType: typeof VariantType = VariantType;
  @Input() presentationLine: PresentationPanierModel | undefined;
  @Input() variant: VariantType;
  @Output() deleteItemEvent = new EventEmitter<number>();

  constructor() { this.variant = VariantType.EDIT; }

  deleteMedicament(value: number) {
    this.deleteItemEvent.emit(value);
  }
}

export enum VariantType {
  EDIT = 0,
  UNAVAILABLE = 1,
}