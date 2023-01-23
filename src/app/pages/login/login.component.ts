import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(){
    
  }
  ngOnInit(): void {
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container');
    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });
    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
    });
  }


}
