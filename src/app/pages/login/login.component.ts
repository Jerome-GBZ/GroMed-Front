import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void { }

  updateEmail(event: any) {
    this.email = event.target.value;
  }

  updatePassword(event: any) {
    this.password = event.target.value;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => {
        console.log(data);
        this.dialogRef.close(data);
      }
    );
  }
}
