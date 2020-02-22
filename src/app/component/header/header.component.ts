import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth/auth.service";
import * as firebase from "firebase/app";
import { RouterModule, Routes, Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  displayname: any;
  Email: any;
  emailVerf: any;
  photoURL: any;
  isAnonymous: any;
  uid: any = "";
  x: number = 1;
  y: number = 5;
  uidV: "sdddd";
  constructor(private authservice: AuthService, private router: Router) {
    this.authservice.initapp();
    // this.displayname = this.authservice.userValue[0];
    // this.Email = this.authservice.userValue[1];
    // this.emailVerf = this.authservice.userValue[2];
    // this.photoURL = this.authservice.userValue[3];
    // this.isAnonymous = this.authservice.userValue[4];
    // this.uid = this.authservice.userValue[5];
  }

  ngOnInit() {
    // console.log(this.uid);
  }
  onSelect() {
    this.router.navigate(["/member", document.getElementById("uid").innerText]);
  }
  logout() {
    this.authservice.doLogout();
    location.reload(true);
    window.location.href=""
  }
  // initapp(){
  //   this.authservice.initapp();
  //   document.getElementById('nav-login').hidden = true;
  //   document.getElementById('nav-logout').hidden = false;
  // }

  // initapp(){
  //   firebase.auth().onAuthStateChanged(function(user){
  //     if(user){
  //       this.displayname = user.displayName;
  //       this.Email = user.email;
  //       this.emailVerf = user.emailVerified;
  //       this.photoURL = user.photoURL;
  //       this.isAnonymous = user.isAnonymous;
  //       this.uid = user.uid;
  //       // this.providerData = user.providerData;
  //       console.log(this.uid);
  //       // document.getElementById('uidValue').textContent = this.uid;
  //     }
  //   })
  // }

  checkuser() {
    // this.authservice.initapp();
    // document.getElementById('nav-login').hidden = true;
    //document.getElementById('login-btn').hidden = true;
    //document.getElementById('regis-li').textContent = "logout";
  }
}
