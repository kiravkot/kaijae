import { Component, OnInit } from '@angular/core';
import { ContestDataService } from "src/app/service/contest-data.service";
import { User, Contest, Match } from "src/app/user";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "src/app/service/auth/auth.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: 'app-kai',
  templateUrl: './kai.component.html',
  styleUrls: ['./kai.component.css']
})
export class KaiComponent implements OnInit {
  useruid: any;
  kaiid:any;
  userprofile: any;
  user: User[] = [];
  contest: Contest[] = [];
  match: Match[] = [];
  model = { firstname: "", lastname: "", mobile_no: "" };
  constructor(
    private route: ActivatedRoute,
    public _data: ContestDataService,
    private db: AngularFirestore,
    private auth: AuthService,
    private fireauth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._data.getUsers().subscribe((data: User[]) => {
      this.user = data;
      console.log(this.user);
    });
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
      console.log(this.contest);
    });
    this.useruid = this.route.snapshot.paramMap.get("uid");
    this.kaiid = this.route.snapshot.paramMap.get("kaiid");
    this.getuserprofile();
    // this._data.getMatch().subscribe((data: Match[]) => {
    //   this.match = data;
    //   console.log(this.match);
    // });
  }
  getuserprofile() {
    // this.useruid = document.getElementById("uid").innerText;
    // this.match = this.matchcollection.snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(e => {
    //       const data1 = e.payload.doc.data() as Match;
    //       data1.uid = e.payload.doc.id;
    //       return data1;
    //     });
    //   })
    console.log(this.useruid)
    console.log(this.kaiid)
    let userRef = this.db
      .collection("Member")
      .doc(this.useruid).collection("kai").doc(this.kaiid)
      .snapshotChanges()
      .subscribe(doc => {
        let data = doc.payload.data();
        this.userprofile = data;
        this.userprofile.id = doc.payload.id;
        this.userprofile.ref = doc.payload.ref.path;
        console.log(this.userprofile)
        document
          .getElementById("imguserURL")
          .setAttribute("src", this.userprofile.imgkaiRef);
        document.getElementById("fullname").innerHTML =
          this.userprofile.kainame
      });
  }
}
