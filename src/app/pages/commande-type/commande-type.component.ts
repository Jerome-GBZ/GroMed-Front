import { CommandeTypeControllerService, CommandeTypeInfoModel, PresentationRecapCommandeDTO, UtilisateurModel } from 'src/libs';
import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
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
  public email: string = '';
  public commandeSelected: string = '';
  public prestations: Array<PresentationRecapCommandeDTO> = [];
  public filteredCommandeTypes: Array<CommandeTypeInfoModel> = [];
  public commandeTypes : Array<CommandeTypeInfoModel> = [];
  public isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private commandeTypeService: CommandeTypeControllerService
  ) { }
  ngOnInit(): void {
    this.checkConnected();
    this.getCommandeTypes();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  checkConnected() {
    let potentialEmail = this.authService.getUtilisateur()?.email;

    if(potentialEmail === undefined || potentialEmail === '') {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    } else {
      this.email = potentialEmail;
    }
  }

  getCommandeTypes() {
    this.commandeTypeService.getCommandeTypes(this.email, '').subscribe(
      (commandeTypes: Array<CommandeTypeInfoModel>) => {
        this.commandeTypes = commandeTypes;
        this.filteredCommandeTypes = commandeTypes;

        this.isLoading = false;
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des commandes types"});
      }
    );
  }

  searchCommandType(event: any) {
    let value = event.target.value.toLowerCase();

    this.filteredCommandeTypes = this.commandeTypes.filter(
      (commandeType: CommandeTypeInfoModel) => {
        return commandeType.nom!!.toLowerCase().includes(value);
      }
    );
  }

  addToCart(name: string) {
    this.loadingButton = true;
    this.checkConnected();

    this.commandeTypeService.addCommandeTypeToUserCart(this.email, name).subscribe(
      (utilisateur: UtilisateurModel) => {
        this.loadingButton = false;
        this.authService.updatePanier(utilisateur);
        this.messageService.add({severity:'success', summary: 'Success', detail: "La commande type a été ajouté au panier"});
      }, (error: any) => {
        this.loadingButton = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: "La commande type n'a pas pu être ajouté au panier"});
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
    this.checkConnected();

    this.commandeTypeService.getCommandeTypeDetail(this.email, name).subscribe(
      (prestations: Array<PresentationRecapCommandeDTO>) => {
        this.prestations = prestations;
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des détails d'une commande type"});
      }
    );
  }
}
