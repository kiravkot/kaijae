import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ImplicitReceiver } from "@angular/compiler";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "angularfire2/firestore";
@Injectable()
export class AuthService {
  displayname: any;
  email: any;
  emailVerf: any;
  photoURL: any;
  isAnonymous: any;
  uid: any;
  Memberref: any;
  authState: any = null;
  userValue: any[] = [
    // this.displayname,
    // this.email,
    // this.emailVerf,
    // this.photoURL,
    // this.isAnonymous,
    // this.uid
  ];
  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {}

  authenticated(): boolean {
    return this.authState !== null;
  }

  doFacebookLogin() {
    // return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
    // .then(res => {
    //   resolve(res);
    // }, err => {
    //   console.log(err);
    //   reject(err);
    // })
    // })
  }

  doTwitterLogin() {
    // return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
    //   .then(res => {
    //     resolve(res);
    //   }, err => {
    //     console.log(err);
    //     reject(err);
    //   })
    // })
  }

  doGoogleLogin() {
    // return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    this.afAuth.auth.signInWithPopup(provider);
    //   .then(res => {
    //     resolve(res);
    //   }, err => {
    //     console.log(err);
    //     reject(err);
    //   })
    // })
  }

  doRegister(formvalue: NgForm) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        formvalue.value.email,
        formvalue.value.password
      )
      .then(function(data) {
        console.log(data.user.uid);
        let memref = firebase
          .firestore()
          .collection("Member")
          .doc(data.user.uid);
        memref.set(formvalue.value);
        alert("ลงทะเบียนสำเร็จ");
      })
      .catch(function(error) {
        alert("Email ซ้ำ กรุณาเปลี่ยน Email");
        console.log(error);
      });
  }

  doLogin(formvalue: NgForm) {
    this.afAuth.auth.signInWithEmailAndPassword(
      formvalue.value.email,
      formvalue.value.password
    )
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut();
        document.getElementById("nav-login").hidden = false;
        document.getElementById("nav-logout").hidden = true;
      }
    });
  }

  getuid(){
    let sss = this.afAuth.auth.currentUser.uid
    return sss
  }

  checkstateuser(){
    let here = this;
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        here.db
          .collection("Member")
          .doc(user.uid)
          .get()
          .subscribe(function(doc) {
          if(doc.exists){

            if (doc.data().permission == "Member"){
              document.getElementById("judge").hidden = true
            }
            else{
              document.getElementById("judge").hidden = false
            }
          }
          })
      }
    })
  }

  initapp() {
    let here = this;
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        // this.uid = user.uid;
        // console.log("getuid" + this.uid);
        document.getElementById("uid").innerHTML = user.uid;
        document.getElementById("userEmail").innerHTML = user.email;
        // var providerData = user.providerData;
        document.getElementById("nav-login").hidden = true;
        document.getElementById("nav-logout").hidden = false;
        let memref = here.db
          .collection("Member")
          .doc(user.uid)
          .get()
          .subscribe(function(doc) {
            if (doc.exists) {
              document.getElementById("membername").innerHTML =
                doc.data().fname + "  " + doc.data().lname;
              // console.log("Document data:", doc.data().permission);
              if (doc.data().permission == "Member") {
                document.getElementById("Committee").hidden = true;
                // document.getElementById("Committee-add").hidden = true;
              } else {
                document.getElementById("Committee").hidden = false;
              }
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          });
      }
    });
  }
}
