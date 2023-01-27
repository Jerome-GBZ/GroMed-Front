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

  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() acceptItemEvent = new EventEmitter<string>();

  constructor() { this.variant = VariantType.EDIT; }

  deleteMedicament(value: string) {
    this.deleteItemEvent.emit(value);
  }

  acceptPresentation(value: string) {
    this.acceptItemEvent.emit(value);
  }
}

export enum VariantType {
  EDIT = 0,
  UNAVAILABLE = 1,
}