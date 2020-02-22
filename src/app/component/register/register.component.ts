import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user/user.service";
import { AuthService } from "src/app/service/auth/auth.service";
import { AngularFirestore } from "angularfire2/firestore";

// import * as firebase from "firebase/app";
import { AngularFireStorage } from "angularfire2/storage";

import { AngularFireAuth } from "angularfire2/auth";
import { NgForm, NgModel, FormControlName, FormControl } from "@angular/forms";
import { finalize } from "rxjs/operators";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public imagePath;
  imgURL: any;
  imgSrc: string = "assets/img/img_placeholder.jpg";
  selectImage: any = null;
  isSubmitted: boolean = false;
  sexs: string[];
  memberList: any;
  constructor(
    private uploadfile: AngularFireStorage,
    private userservice: UserService,
    private authservice: AuthService,
    private db: AngularFirestore,
    private fireauth: AngularFireAuth
  ) {
    //this.password =  regisform.controls['Confirm-Password'].value;
  }

  ngOnInit() {
    this.sexs = ["ชาย", "หญิง"];
  }

  addregis(regisform: NgForm) {
    /*if(regisform.controls['fname'].value == ""){
      console.log("กรุณากรอกชื่อ");  
    }
    else if(regisform.controls['lname'].value == ""){
      console.log("กรุณากรอกชื่อ");  
    }
    else if(regisform.controls['fname'].value == ""){
      console.log("กรุณากรอกชื่อ");  
    }
    else if(regisform.controls['fname'].value == ""){
      console.log("กรุณากรอกชื่อ");  
    }
    else if(regisform.controls['fname'].value == ""){
      console.log("กรุณากรอกชื่อ");  
    }*/
    // console.log(regisform);
    //console.log(regisform.invalid);

    console.log(regisform.value);
    // console.log(regisform.controls['fname'].value);

    // console.log(this.authservice.uid);
    // this.db.collection("Member").add(regisform.value);

    // this.userservice.addDataToFirebase(regisform.value);
  }
  checkuser() {}
  showpreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectImage = event.target.files[0];
    } else {
      this.imgSrc = "assets/img/img_placeholder.jpg";
      this.selectImage = null;
    }
  }
  uploadimg(form: NgForm) {
    console.log("test");
    this.isSubmitted = true;
  }
  doRegister(formvalue: NgForm) {
    let here = this;
    this.fireauth.auth
      .createUserWithEmailAndPassword(
        formvalue.value.email,
        formvalue.value.password
      )
      .then(function(data) {
        // this.uploadimg(formvalue);
        console.log(data.user.uid);
        let filePath = `Users/${here.selectImage.name
          .split(".")
          .slice(0, -1)
          .join(".")}_${new Date().getTime()}`;
        const fileRef = here.uploadfile.ref(filePath);
        here.uploadfile
          .upload(filePath, here.selectImage)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                formvalue.value.imgprofileRef = url;
                // form.controls["ConfirmPassword"].;
                formvalue.value.permission = "Member";
                let memref = here.db.collection("Member").doc(data.user.uid);
                memref.set(formvalue.value).finally(()=>{
                  alert("ลงทะเบียนสำเร็จ");
                console.log("complete");
                window.location.href="/member/"+ data.user.uid 
                });
              });
            })
          )
          .subscribe();
      })
      .catch(function(error) {
        alert("Email ซ้ำ กรุณาเปลี่ยน Email");
        console.log(error);
      });
  }
  getdata() {
    this.userservice.getDataFromFirebase();
  }
}
