import { Component, OnInit } from "@angular/core";
import {
  NgForm,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "angularfire2/firestore";
@Component({
  selector: "app-changepermission",
  templateUrl: "./changepermission.component.html",
  styleUrls: ["./changepermission.component.css"]
})
export class ChangepermissionComponent implements OnInit {
  constructor(private firedb: AngularFirestore) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.firedb
      .collection("Member", ref =>
        ref
          .where("email", "==", form.value.email)
          .where("permission", "==", "Member")
      )
      .get()
      .subscribe(check => {
        if (check.empty) {
          alert("Email นี้ไม่มีอยู่ในระบบ");
        } else {
          check.forEach(doc => {
            doc.ref.update("permission", "judge").finally(()=>{alert(form.value.email+" เปลี่ยนเป็นกรรมการเรียบร้อยแล้ว")});
          });
        }
      });
  }
}
