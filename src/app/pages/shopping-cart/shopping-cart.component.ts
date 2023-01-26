import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeControllerService, PresentationPanierModel, UtilisateurModel } from 'src/libs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  public total: number = 0;
  public subTotal: number = 0;
  public reducTotal: number = 0;
  public stepShop: number = 1;
  public width: number = window.innerWidth;
  public medicamentsLine: Array<PresentationPanierModel> = new Array();

  constructor(private authService: AuthService,
    private commandeService: CommandeControllerService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUtilisateur()?.email;
    if(email === undefined){
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification ou d'identifiant produit"});
      return;
    }

   this.commandeService.getUserCart(email).subscribe(
     (data: Array<PresentationPanierModel>) => {
        this.medicamentsLine = data;
        console.log(data);

        this.resetTotals();
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération du panier"});
      }
   );
  }

  deleteItem(codeCIP7: string) {
    const email = this.authService.getUtilisateur()?.email;

    if(email === undefined || codeCIP7 === undefined){
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification ou d'identifiant produit"});
      return;
    }

    this.commandeService.deletePresentationToCart(email, codeCIP7).subscribe(
      (data: UtilisateurModel) => {
        this.authService.updatePanier(data);
        this.medicamentsLine = this.medicamentsLine.filter((medicament) => medicament.codeCIP7 !== codeCIP7);
        this.resetTotals();

        this.messageService.add({severity:'success', summary: 'Success', detail: "Le produit a été supprimé du panier"});
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de suppression du produit"});
      }
    )
  }

  resetTotals() {
    this.subTotal = 0;
    this.reducTotal = 0;

    this.medicamentsLine.forEach((medicament) => {
      this.subTotal += medicament.prixUnitaire!!;
      this.reducTotal += medicament.prixUnitaire!! * (medicament.tauxRemboursement!! / 100);
    });

    this.total = this.subTotal - this.reducTotal;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  onStepChange(value: number) {
    this.stepShop = value;
  }
}
