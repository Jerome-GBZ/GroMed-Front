import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeControllerService, PresentationPanierModel, UtilisateurModel, LivraisonModel } from 'src/libs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  public total: number = 0;
  public stepShop: number = 1;
  public width: number = window.innerWidth;
  public medicamentsLine: Array<PresentationPanierModel> = new Array();
  public livraison: LivraisonModel | undefined;
  public commandeName: string = '';
  public loadingValidation: boolean = false;

  constructor(private authService: AuthService,
    private commandeService: CommandeControllerService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUtilisateur()?.email;
    if(email === undefined){
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification ou d'identifiant produit"});
      this.authService.removeUtilisateur();
      return;
    }

   this.commandeService.getUserCart(email).subscribe(
     (data: Array<PresentationPanierModel>) => {
        this.medicamentsLine = data;
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
      this.authService.removeUtilisateur();
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

  validateCommand() {
    let email = this.authService.getUtilisateur()?.email;

    if(email === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    }

    this.loadingValidation = true;

    this.commandeService.validateCart(email,this.commandeName).subscribe(
      (livraison: LivraisonModel) => {
        this.livraison = livraison;
        this.loadingValidation = false;

        this.messageService.add({severity:'success', summary: 'Success', detail: "Commande validée"});
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de validation de la commande"});
      }
    );
  }

  resetTotals() {
    this.total = 0;
    this.medicamentsLine.forEach((medicament) => {
      this.total += medicament.prixUnitaire!!;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  onStepChange(value: number) {
    this.stepShop = value;

    if(this.stepShop === 3) {
      this.validateCommand();
    }
  }

  options: AnimationOptions = {
    path: '/assets/lottie/green-spinner.json'
  };
}
