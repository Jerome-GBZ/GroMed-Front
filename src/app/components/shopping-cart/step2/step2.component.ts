import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeControllerService, InfoImportanteModel, PresentationPanierModel, UtilisateurModel } from 'src/libs';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  providers: [MessageService]
})
export class Step2Component implements OnInit {
  public disabledButton = true;
  public notInStock: Array<PresentationPanierModel> = new Array();
  public inStock: Array<PresentationPanierModel> = new Array();
  public productNotInStockAccept: number = 0;

  @Input() subTotal: number = 0;
  @Input() reducTotal: number = 0;
  @Input() total: number = 0;
  @Input() medicamentsLine: Array<PresentationPanierModel> = new Array();

  @Output() stepItemEvent = new EventEmitter<number>();
  @Output() deleteItemEvent = new EventEmitter<string>();

  constructor(private authService: AuthService,
    private commandeService: CommandeControllerService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.notInStock = this.medicamentsLine.filter((medicament) => medicament.stock!! < medicament.quantite!!);
    this.inStock = this.medicamentsLine.filter((medicament) => medicament.stock!! >= medicament.quantite!!);
  }

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }

  deleteItem(codeCIP7: string | undefined) {
    if(codeCIP7 !== undefined) {
      this.notInStock = this.notInStock.filter((medicament) => medicament.codeCIP7 !== codeCIP7);

      this.deleteItemEvent.emit(codeCIP7);
    }
  }

  acceptItem(codeCIP7: string | undefined) {
    if(codeCIP7 !== undefined) {
      // delete item from notInStock
      this.notInStock = this.notInStock.filter((medicament) => medicament.codeCIP7 !== codeCIP7);
      // add item to inStock
      this.inStock.push(this.medicamentsLine.find((medicament) => medicament.codeCIP7 === codeCIP7)!!);

      this.productNotInStockAccept++;
    }
  }

  getPreventions() {
    let preventions = Array<InfoImportanteModel>();

    this.medicamentsLine.forEach((medicament) => {
      medicament.infoImportantes!!.forEach((prevention) => {
        preventions.push(prevention);
      });
    });

    return preventions;
  }

  getTotal(quantite: number | undefined, prixU: number | undefined) {
    return quantite!! * prixU!!;
  }

  acceptCondition() {
    this.disabledButton = !this.disabledButton;
  }
}