import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { LoginComponent } from '../login/login.component';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [MessageService]
})
export class WelcomeComponent {

  public constructor(public dialog: MatDialog, private messageService: MessageService, public router: Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});

        setTimeout(() => {
          this.router.navigate(['/']);
       }, 3000);
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
      }
    });
  }
}
