import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { UserService } from "src/app/service/user/user.service";
import { switchMap } from "rxjs/operators";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "angularfire2/firestore";
import * as admin from "firebase-admin";
import { ContestDataService } from "src/app/service/contest-data.service";
import { PathEventArgs } from "../selectcontest/selectcontest.component";
// import { Custom } from "../playerscore";
// import { Key } from "protractor";

@Component({
  selector: "app-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.css"]
})
export class ScoreComponent implements OnInit {
  po: any;
  point1: any;
  point2: any;
  point3: any;
  point4: any;
  memsID1: any;
  memsID2: any;
  memsID3: any;
  memsID4: any;
  item1: any;
  matchList: any;
  playerList: any;
  match: any;
  matchID: string;
  path: PathEventArgs;
  message: string;
  str;
  public pathid;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private service: HeroService,
    private userservice: UserService,
    private db: AngularFirestore,
    private _data: ContestDataService
  ) {
    // this.po = db.firestore
    //   .collection("contest")
    //   .doc("Og7M5X0UG1SgmMAAQyfc")
    //   .collection("match")
    //   .doc("dxOiF3aNQ7SSTkCXu9DC")
    //   .collection("player");
    // this.showscore("555");
    // this.getplayer();
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.pathid = id;
    this.str = id.split("/");
    this._data.path.subscribe(data => {
      // console.log(data);
      this.path = data;
    });
    this.showT(this.str);
  }

  showT(str: Array<string>) {
    // let name = "";
    console.log(str[0]);
    // where("MatchID", "==", ID)
    this.db.firestore
      .collection(str[0])
      .doc(str[1])
      .collection(str[2])
      .doc(str[3])
      .get()
      .then(doc => {
        if (doc.exists) {
          document.getElementById("matchname").innerText =
            "ประเภท  " + doc.data().name + " " + doc.data().time + " นาที";
          if (doc.data().type == "cheer") {
            document.getElementById("matchname").innerText += "  เชียร์ได้";
          } else {
            document.getElementById("matchname").innerText += "  ห้ามเชียร์";
          }
          // document.getElementById("matchname").innerText = doc.data().name;
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    // if (this.matchList.name == "cheer") {
    //   name = "เชียร์ได้";
    // } else {
    //   name = "ห้ามเชียร์";
    // }

    // this.po.onSnapshot(querySnapshot =>
    //   if (querySnapshot.empty) {
    //     console.log("ไม่พบข้อมูล");
    //   } else {
    //     querySnapshot.forEach(doc => {
    // this.item1 = doc.data().MatchID;
    // this.match = doc.id;
    this.db
      .collection(str[0])
      .doc(str[1])
      .collection(str[2])
      .doc(str[3])
      .collection(
        "player",
        ref => ref.where("status", "==", true).orderBy("score", "desc")
        // .limit(10)
      )
      .valueChanges()
      .subscribe(
        val => ((this.playerList = val), console.log(this.playerList))
      );
    this._data.currentpath.subscribe(message => (this.message = message));
    // });
    // }
    // });
  }
  dada() {
    // console.log(message);
    this._data.currentpath.subscribe(message => (this.message = message));
    // this._data.sendpath(data);
    // this.pathservice.sendpath(data);
  }
  getplayer(data: any) {
    this.playerList.push(data);
  }
}
