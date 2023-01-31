import { MessageService } from 'primeng/api';
import { Location } from '@angular/common'
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeControllerService, PresentationControllerService, PresentationDetailModel, UtilisateurModel } from 'src/libs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [MessageService]
})
export class ProductDetailsComponent {
  [x: string]: any;
  width: number = window.innerWidth;
  subtotal: number = 0;
  loading: boolean = false;
  public disabledButton = false;

  medicamentDetails? : PresentationDetailModel

  public constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private commandeService: CommandeControllerService,
    private presentationService: PresentationControllerService,
    public location: Location,
  ) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.presentationService.getDetailPresentation(id).subscribe( (data: PresentationDetailModel) => {
        console.log(data)
          if(data !== undefined){
            this.medicamentDetails = data;
            this.subtotal = data.prix!!;
            if(data.informationsImportantes?.length! === 0)
              this.disabledButton = true;
          }
        }
      )
    });
  }

  public convertToNumber(value: string): number {
    return Number(value);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  getSubtotal(quantity: string) {
    this.subtotal = Number((Number(quantity) * this.medicamentDetails!!.prix!).toFixed(2))
  }


  acceptCondition() {
    this.disabledButton = !this.disabledButton;
  }

  addToCart(quantity: string) {
    this.loading = true;

    let email = this.authService.getUtilisateur()?.email;
    let codeCIP7 = this.medicamentDetails!!.codeCIP7;

    if(email === undefined || codeCIP7 === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification ou d'identifiant produit"});
      this.authService.removeUtilisateur();
      return;
    }

    this.commandeService.addPresentationToCart(email, codeCIP7, Number(quantity)).subscribe(
      (data: UtilisateurModel) => {
        this.loading = false;
        this.authService.updatePanier(data);
        this.messageService.add({severity:'success', summary: 'Success', detail: "Le produit a été ajouté au panier"});
      }, (error: any) => {
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: "Le produit n'a pas pu être ajouté au panier"});
      }
    );
  }
  
}
