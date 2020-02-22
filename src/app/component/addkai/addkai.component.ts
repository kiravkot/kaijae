import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";
import { finalize } from "rxjs/operators";
// import { firebase } from "firebase/app";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-addkai",
  templateUrl: "./addkai.component.html",
  styleUrls: ["./addkai.component.css"]
})
export class AddkaiComponent implements OnInit {
  userprofile: any;
  public imagePath;
  imgURL: any;
  imgSrc: string = "assets/img/img_placeholder.jpg";
  selectImage: any = null;
  isSubmitted: boolean = false;
  constructor(
    private uploadfile: AngularFireStorage,
    private db: AngularFirestore,
    private aut: AngularFireAuth
  ) {}

  ngOnInit() {}

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
  // preview(files) {
  //   if (files.length == 0) return;
  //   var mineType = files[0].type;
  //   if (mineType.match(/image\/*/) == null) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = event => {
  //     this.imgURL = reader.result;
  //   };
  // }

  uploadimg(form: NgForm) {
    console.log("test");
    this.isSubmitted = true;
    let filePath = `kaijae/${this.selectImage.name
      .split(".")
      .slice(0, -1)
      .join(".")}_${new Date().getTime()}`;
    const fileRef = this.uploadfile.ref(filePath);
    this.uploadfile
      .upload(filePath, this.selectImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            form.value.imgprofile = url;
            console.log("complete");
          });
        })
      )
      .subscribe();
  }

  doRegister(formvalue: NgForm) {
    let here = this;
    var user = here.aut.auth.currentUser;
    if (user != null) {
      here.userprofile = user.uid;
      // here.userprofile.name = user.displayName;
      // here.userprofile.email = user.email;
      // here.userprofile.photoUrl = user.photoURL;
      // here.userprofile.emailVerified = user.emailVerified;
      // here.userprofile.uid = user.uid;
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.

      let filePath = `kaijae/${here.selectImage.name
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
              formvalue.value.imgkaiRef = url;
              // form.controls["ConfirmPassword"].;
              // formvalue.value.permission = "Member";
              let memref = here.db
                .collection("Member")
                .doc(user.uid)
                .collection("kai");
              memref.add(formvalue.value);
              alert("ลงทะเบียนสำเร็จ");
              console.log("complete");
            });
          })
        )
        .subscribe();
      // console.log(here.userprofile);
    }
  }
}
