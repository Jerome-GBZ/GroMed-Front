import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommandeControllerService, CommandeModel } from 'src/libs';
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

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private commandeService: CommandeControllerService
  ) { }

  ngOnInit(): void {
    const email = this.authService.getUtilisateur()?.email;

    if(email === undefined) {
      this.messageService.add({severity:'error', summary: 'Error', detail: "Problème d'authentification"});
      this.authService.removeUtilisateur();
      return;
    }

    this.commandeService.getAllCommande(email).subscribe(
      (commandes: Array<CommandeModel>) => {
        this.commandes = commandes;
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
}
declare const moment: any;

