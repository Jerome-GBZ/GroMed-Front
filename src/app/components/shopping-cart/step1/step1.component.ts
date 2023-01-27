import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeControllerService, PresentationPanierModel, UtilisateurModel } from 'src/libs';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  providers: [MessageService]
})
export class Step1Component {
  @Input() subTotal: number = 0;
  @Input() reducTotal: number = 0;
  @Input() total: number = 0;
  @Input() medicamentsLine: Array<PresentationPanierModel> = new Array();

  @Output() stepItemEvent = new EventEmitter<number>();
  @Output() deleteItemEvent = new EventEmitter<string>();

  constructor() { }

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }

  deleteItem(codeCIP7: string | undefined) {
    if(codeCIP7 !== undefined) {
      this.deleteItemEvent.emit(codeCIP7);
    }
  }
}
