import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NgForm, NgModel,FormControlName, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit() {
  }

  Otherlogin(logintype:string){
    switch(logintype){
      case 'facebook':
        this.authservice.doFacebookLogin();
        break;
      case 'google':
        this.authservice.doGoogleLogin();
        break;
      case 'twitter':
        this.authservice.doTwitterLogin();
        break;
    }
  }

  login(value: NgForm){
    this.authservice.doLogin(value);
  }
}
