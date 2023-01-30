import { CommandeTypeControllerService, CommandeTypeInfoModel, PresentationRecapCommandeDTO, UtilisateurModel } from 'src/libs';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-commande-type',
  templateUrl: './commande-type.component.html',
  styleUrls: ['./commande-type.component.scss'],
  providers: [MessageService]
})
export class CommandeTypeComponent implements OnInit {
  public width: number = window.innerWidth;
  public loadingButton: boolean = false;
  public commandeSelected: string = '';
  public prestations: Array<PresentationRecapCommandeDTO> = [];
  public commandeTypes : Array<CommandeTypeInfoModel> = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private commandeTypeService: CommandeTypeControllerService
  ) { }
  ngOnInit(): void {
    const email = this.authService.getUtilisateur()?.email;

    if(email === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    }

    this.commandeTypeService.getCommandeTypes(email, '').subscribe(
      (commandeTypes: Array<CommandeTypeInfoModel>) => {
        this.commandeTypes = commandeTypes;
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des commandes types"});
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  addToCart(name: string) {
    this.loadingButton = true;
    const email = this.authService.getUtilisateur()?.email;

    if(email === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    }

    this.commandeTypeService.addCommandeTypeToUserCart(email, name).subscribe(
      (utilisateur: UtilisateurModel) => {
        this.loadingButton = false;
        this.authService.updatePanier(utilisateur);
        this.messageService.add({severity:'success', summary: 'Success', detail: "Le produit a été ajouté au panier"});
      }, (error: any) => {
        this.loadingButton = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: "Le produit n'a pas pu être ajouté au panier"});
      }
    );
  }

  seeDetailCommandeType(name: string) {
    if(this.commandeSelected === name) {
      this.commandeSelected = '';
    } else {
      this.commandeSelected = name;
      this.getPresentation(name);
    }
  }

  getPresentation(name: string): void {
    const email = this.authService.getUtilisateur()?.email;

    if(email === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    }

    this.commandeTypeService.getCommandeTypeDetail(email, name).subscribe(
      (prestations: Array<PresentationRecapCommandeDTO>) => {
        this.prestations = prestations;
        console.log(this.prestations);
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des détails d'une commande type"});
      }
    );
  }
}
