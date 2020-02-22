import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user/user.service";
import {
  AngularFirestoreModule,
  AngularFirestore,
  validateEventsArray
} from "angularfire2/firestore";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase/app";
import { User, Contest, Match } from "src/app/user";
import { ContestDataService } from "src/app/service/contest-data.service";
// import { map } from "rxjs/operators";
// const dbquery = firebase.firestore();
@Component({
  selector: "app-addscore",
  templateUrl: "./addscore.component.html",
  styleUrls: ["./addscore.component.css"]
})
export class AddscoreComponent implements OnInit {
  po: any;
  playerList: any;
  matchList: any;
  playerid: {};
  count: number = 0;
  point1: number;
  nextLibAvailable: boolean = false;
  point2: number;
  point3: number;
  point4: number;
  memsID1: any;
  memsID2: any;
  memsID3: any;
  memsID4: any;
  match1: string;
  matchID: string;
  contest: Contest[] = [];
  match: Match[] = [];
  ff: any;
  contestid: any;
  matchid: any;
  constructor(
    private userservice: UserService,
    private db: AngularFirestore,
    private _data: ContestDataService
  ) {
    this.po = db.firestore.collection("match");
    //this.match1 = '555';
    //this.showscore(this.match1);
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
      // console.log(this.contest);
    });
  }

  ngOnInit() {}
  changeoption(text: string) {
    var str = "";
    if (text == "cheer") {
      str = "เชียร์ได้";
    } else {
      str = "ห้ามเชียร์";
    }
    return str;
  }

  qureymatch(num: any) {
    this.db.firestore
      .collection(num.value.contestid + "/match")
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
            console.log(doc.data());
          });
        }
      });
    this.db
      .collection(num.value.contestid + "/match")
      .valueChanges()
      .subscribe(
        data => (
          (this.matchList = data),
          // console.log(data),
          console.log(this.matchList)
        )
      );

    // console.log("qweqwe" + this.matchid);
  }
  getmatch(Addform: NgForm) {
    this.match1 = Addform.controls["match"].value;
    this.po.where("matchID", "==", this.match1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.ff = doc.id;
      });
    });
    // this.showscore(this.match1);
    // console.log(
    //   this.po
    //     .where("matchID", "==", this.match1)
    //     .whereArrayContains("items", "memID")
    // );
  }

  // showscore(ID: string) {
  //   this.po.where("matchID", "==", ID).onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       this.ff = doc.id;
  //       this.memsID1 = doc.data().memID1;
  //       this.point1 = doc.data().score1;
  //     });
  //     querySnapshot.forEach(doc => {
  //       this.memsID2 = doc.data().memID2;
  //       this.point2 = doc.data().score2;
  //     });
  //     querySnapshot.forEach(doc => {
  //       this.memsID3 = doc.data().memID3;
  //       this.point3 = doc.data().score3;
  //     });
  //     querySnapshot.forEach(doc => {
  //       this.memsID4 = doc.data().memID4;
  //       this.point4 = doc.data().score4;
  //     });
  //   });
  // }
  showtable(value: NgForm) {
    const ref = this;
    let player = [];

    this.db.firestore
      .collection(value.value.contestid + "/match/" + this.matchid + "/player")
      .where("committeeid", "==", document.getElementById("uid").innerText)
      .limit(4)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("ไม่พบข้อมูลผู้เล่น");
        } else {
          querySnapshot.forEach(doc => {
            let a = {
              uid: ""
              // id:"",
              // name:"",
              // number: 0,
              // score: 0,
              // committeeid:""
            };
            a.uid = doc.ref.path;
            player.push(a);

            console.log(player);
          });
        }
        ref.playerid = player;
        console.log(ref.playerid);
      });
    this.db
      .collection(value.value.contestid + "/match")
      .doc(this.matchid)
      .collection("player", ref =>
        ref
          .where("committeeid", "==", document.getElementById("uid").innerText)
          .limit(4)
      )
      .valueChanges()
      .subscribe(
        val => {
          this.playerList = val;
          console.log(this.playerList);
          // console.log(val.keys);
          // document.getElementById("SSS").hidden = true;
        },
        error => {
          alert("ไม่พบข้อมูล");
        },
        () => {
          console.log("complete");
          document.getElementById("SSS").hidden = true;
        }
      );
  }
  setscore(num: number, score: number) {
    // console.log(this.playerid[num].uid);
    // console.log(score);
    const str = this.playerid[num].uid.split("/");
    // const increment = firebase.firestore.FieldValue.increment(1);
    const ref = firebase
      .firestore()
      .collection(
        str[0] + "/" + str[1] + "/" + str[2] + "/" + str[3] + "/" + str[4]
      )
      .doc(str[5]);
    // this.nextLibAvailable = true;
    ref.update({ score: score + 1 }).then(() => {
      document
        .getElementById(num.toString())
        .setAttribute("disabled", "disabled");
      setTimeout(() => {
        document.getElementById(num.toString()).removeAttribute("disabled");
        console.log("gggg");
      }, 2000);
    });

    //
    // document.getElementById()
    // });
  }
}
