import { Component, OnInit, NgModule } from "@angular/core";
import { UserService } from "src/app/service/user/user.service";
import { AuthService } from "src/app/service/auth/auth.service";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFirestore } from "angularfire2/firestore";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map, filter, scan, retry } from "rxjs/operators";
import {
  NgForm,
  NgModel,
  FormControlName,
  FormControl,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { ContestDataService } from "src/app/service/contest-data.service";
import { User, Contest, Match } from "src/app/user";
import { database } from "firebase";
// import {} from "module";
@Component({
  selector: "app-regismatch",
  templateUrl: "./regismatch.component.html",
  styleUrls: ["./regismatch.component.css"]
})
export class RegismatchComponent implements OnInit {
  useruid: any;
  kailist: any[];
  playerList: any;
  matchList: any;
  user: User[] = [];
  contest: Contest[] = [];
  match: Match[] = [];
  matchcollection: AngularFirestoreCollection<Match>;
  match1: Observable<Match[]>;
  po: any;
  gg: any[] = [];
  naaa: any;
  fb: FormBuilder;
  form: FormGroup;
  contestid: any;
  matchid: any;

  constructor(
    private userservice: UserService,
    private db: AngularFirestore,
    private authservice: AuthService,
    public _data: ContestDataService,
    private fireauth: AngularFireAuth
  ) {
    // this.po = db.firestore.collection("contest");
    // this.qureycontest();

    this._data.getUsers().subscribe((data: User[]) => {
      this.user = data;
      console.log(this.user);
    });
    this._data.getContests().subscribe((data: Contest[]) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        data[index].flag = true;
        var q = this.db
          .collection(element.path + "/match")
          .snapshotChanges()
          .pipe(
            map(change => {
              return change.map(a => {
                let ee;
                ee = a.payload.doc.data();
                ee.path = a.payload.doc.ref.path;
                return ee;
              });
            })
          );
        q.subscribe((data1: any[]) => {
          data[index].data = data1;
        });
        // this.contest = data;
      }
      this.contest = data;
      console.log(this.contest);
    });
    // this.getmatch(this.contest[0]);
  }
  getuid() {
    let here = this;
    var user = here.fireauth.auth.currentUser;
    if (user != null) {
      here.useruid = user.uid;
      here.db
        .collection("Member/" + user.uid + "/kai")
        .snapshotChanges()
        .subscribe(list => {
          this.kailist = list.map(item => {
            let ee;
            ee = item.payload.doc.data();
            ee.id = item.payload.doc.id;
            return ee;
          });
        });
      console.log(this.kailist);
    }
  }
  ngOnInit() {
    // this.form = this.fb.group({
    //   id: [document.getElementById("uid").innerText],
    //   name: [],
    //   number: [],
    //   score: [],
    //   committeeid: []
    // });
    this.getuid();
    this.naaa = this.randomInt(1, 100);
  }
  qureycontest() {
    this.db
      .collection("contest", ref => ref.where("status", "==", true).limit(10))
      .valueChanges()
      .subscribe(val => (this.playerList = val));
    // console.log(this.matchid);
  }
  // getm(data: any) {
  //   this._data.getmatchwithuid(data).subscribe((data: Contest[]) => {
  //     this.contest = data;
  //     console.log(this.contest);
  //   });
  // }
  qureymatch(num: any) {
    this.db.firestore
      .collection("contest")
      .doc(num.value.contestid)
      .collection("match")
      .where("id", "==", num.value.matchid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("ไม่พบข้อมูล");
        } else {
          querySnapshot.forEach(doc => {
            // const s = doc.data() as Match;
            // s.uid = doc.id;
            // this.match.push(s);
            this.matchid = doc.id;
            // console.log(doc.id);
          });
        }
      });
    this.db
      .collection("contest")
      .doc(num.value.contestid)
      .collection("match")
      .valueChanges()
      .subscribe(
        data => (
          (this.matchList = data),
          // console.log(data),
          console.log(this.matchList)
        )
      );

    console.log("qweqwe" + this.matchid);
  }
  changeoption(text: string) {
    var str = "";
    if (text == "cheer") {
      str = "เชียร์ได้";
    } else {
      str = "ห้ามเชียร์";
    }
    return str;
  }
  randomInt(min: number, max: number) {
    var sum = Math.floor(Math.random() * (max - min + 1)) + min;
    // this.counts.push(sum);
    return sum;
  }
  test(value) {
    console.log(value);
  }
  submit(form: NgForm) {
    let id: string;
    let name: string;
    let number1: number;
    let score: number = 0;
    let committeeid: string;
    id = document.getElementById("uid").innerText;
    number1 = this.naaa;
    this.db.firestore
      .collection("contest")
      .doc(form.value.contestid)
      .collection("match")
      .doc(this.matchid)
      .collection("player")
      .where("id", "==", id)
      .onSnapshot(snap => {
        if (snap.empty) {
          this.db.firestore
            .collection("contest")
            .doc(form.value.contestid)
            .collection("match")
            .doc(this.matchid)
            .collection("player")
            .add({
              id: id,
              name: document.getElementById("membername").innerText,
              imgkaiRef: this.kailist[form.value.kaiID].imgkaiRef,
              kainame: this.kailist[form.value.kaiID].kainame,
              number: number1,
              score: 0,
              committeeid: "",
              status: false
            })
            .then(function(docRef) {
              alert("ลงทะเบียนสำเร็จ");
              form.reset();
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              alert("ลงทะเบียนล้มเหลว");
              console.error("Error adding document: ", error);
            });
        } else {
          alert("มีรายชื่อนี้อยู่แล้ว");
        }
      });
  }
}
