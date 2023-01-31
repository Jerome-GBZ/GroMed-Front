import { DataFormat } from './../../../libs/param';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommandeControllerService, CommandeDetailDTO, CommandeModel } from 'src/libs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [MessageService]
})
export class InvoiceComponent implements OnInit {

  public width: number = window.innerWidth;
  public commandes: Array<CommandeModel> = [];
  public filteredCommande: Array<CommandeModel> = [];
  public commandeSelected: number = -1;
  public email: string = '';
  public commandeDetails: CommandeDetailDTO | undefined;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private commandeService: CommandeControllerService
  ) { }

  ngOnInit(): void {
    this.checkConnected();

    this.commandeService.getAllCommande(this.email).subscribe(
      (commandes: Array<CommandeModel>) => {
        this.commandes = commandes;
        this.filteredCommande = commandes;
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des commandes"});
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  parseDate(date: string): string{
    let dateFormat = moment.utc(date).local();
    return dateFormat.format('DD/MM/YYYY HH:mm:ss')
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

  seeDetailCommande(numeroCommande: number) {
    if(this.commandeSelected === numeroCommande) {
      this.commandeSelected = -1;
    } else {
      this.commandeSelected = numeroCommande;
      this.getDetails(numeroCommande);
    }
  }

  searchCommand(event: any) {
    let value = event.target.value.toLowerCase();

    this.filteredCommande = this.commandes.filter(
      (commande: CommandeModel) => {
        return commande.numeroCommande!!.toString().includes(value);
      }
    );
  }

  getDetails(numeroCommande: number): void {
    this.checkConnected();

    this.commandeService.getDetailCommande(this.email, numeroCommande).subscribe(
      (details: CommandeDetailDTO) => {
        this.commandeDetails = details;
        console.log(this.commandeDetails);
      }, (error: Error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: "Problème de récupération des détails d'une commande"});
      }
    );
  }

  isPossibleToCancel(commande: CommandeModel): boolean {
    let dateFormat = moment.utc(commande.dateCommande).local();
    let now = moment();
    let difference = moment.duration(now.diff(dateFormat));

    return commande.status === 'EN_COURS' &&  difference.asMinutes() < 30;
  }
}

declare const moment: any;

