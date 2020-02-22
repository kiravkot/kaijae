import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user/user.service";
import { AuthService } from "src/app/service/auth/auth.service";
import { AngularFirestore } from "angularfire2/firestore";

// import * as firebase from "firebase/app";
import { AngularFireStorage } from "angularfire2/storage";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { NgForm, NgModel, FormControlName, FormControl } from "@angular/forms";
import { finalize } from "rxjs/operators";
@Component({
  selector: 'app-updatemember',
  templateUrl: './updatemember.component.html',
  styleUrls: ['./updatemember.component.css']
})
export class UpdatememberComponent implements OnInit {
  public imagePath;
  imgURL: any;
  imgSrcdefault: any;
  imgSrc: any;
  selectImage: any = null;
  isSubmitted: boolean = false;
  sexs: string[];
  memberList: any;
  useruid : any;
  private inputFname: string;
  private inputLname: string;
  private inputTel: string;
  private inputAddr: string;
  private inputProvice: string;
  private inputDricstict: string;
  private inputDate: string;
  constructor(
    private route: ActivatedRoute,
    private uploadfile: AngularFireStorage,
    private userservice: UserService,
    private authservice: AuthService,
    private db: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.useruid = this.route.snapshot.paramMap.get("id");
    console.log(this.useruid)
    this.db.firestore.collection("Member").doc(this.useruid).get().then(getuser=>{
      let data = getuser.data()
      this.imgSrc = data.imgprofileRef
      this.imgSrcdefault = data.imgprofileRef
      this.inputFname = data.fname
      this.inputLname = data.lname
      this.inputProvice = data.Province
      this.inputTel = data.tel
      this.inputAddr = data.address
      this.inputDate = data.birth
      console.log(getuser.data())
    })
  }
  showpreview(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectImage = event.target.files[0];
    } else {
      this.imgSrc = this.imgSrcdefault;
      this.selectImage = null;
    }
  }

  tests(formvalue: NgForm){
    formvalue.value.imgprofileRef = this.imgSrcdefault
    console.log(formvalue.value)
  }

  updateprofile(formvalue: NgForm){
    let here = this
    if(this.imgSrc != this.imgSrcdefault){
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
                // formvalue.value.permission = "Member";
                let memref = here.db.collection("Member").doc(this.useruid);
                memref.update(formvalue.value).finally(()=>{
                  alert("แก้ไขข้อมูลสำเร็จ");
                console.log("complete");
                window.location.href="/member/"+ this.useruid
                });
              });
            })
          )
          .subscribe();
    }else{
      formvalue.value.imgprofileRef = this.imgSrcdefault
      let memref = here.db.collection("Member").doc(this.useruid);
                memref.update(formvalue.value).finally(()=>{
                  alert("แก้ไขข้อมูลสำเร็จ");
                console.log("complete");
                window.location.href="/member/"+ this.useruid
              });
    }
    
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
}
