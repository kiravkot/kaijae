import { Component, OnInit } from "@angular/core";
import { Contest, Match } from "src/app/user";
import { AngularFirestore } from "angularfire2/firestore";
import { ContestDataService } from "src/app/service/contest-data.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-addjudgetoplayer",
  templateUrl: "./addjudgetoplayer.component.html",
  styleUrls: ["./addjudgetoplayer.component.css"]
})
export class AddjudgetoplayerComponent implements OnInit {
  contest: Contest[] = [];
  // match: Match[] = [];
  playerList: any[];
  matchList: any;
  matchid: any;
  constructor(
    private db: AngularFirestore,
    private _data: ContestDataService
  ) {}

  ngOnInit() {
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
      console.log(this.contest);
    });
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
  qureymatch(num: any) {
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
  }
  getmatchid(num: NgForm) {
    this.db.firestore
      .collection(num.value.contestid + "/match")
      .where("id", "==", num.value.matchid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("ไม่พบข้อมูล");
        } else {
          querySnapshot.forEach(doc => {
            this.matchid = doc.id;
          });
        }
      });
  }
  getplayer(form: any) {
    if ((document.getElementById("uid").innerText = "")) {
      alert("กรุณา เข้าสู่ระบบ");
      window.location.href = "login";
    } else {
      this.db
        .collection(
          form.value.contestid + "/match/" + this.matchid + "/player",
          ref =>
            ref.where(
              "committeeid",
              "==",
              document.getElementById("uid").innerText
            )
        )
        .snapshotChanges()
        .subscribe(check => {
          if (check.length >= 4) {
            alert("คุณเป็นกรรมการครบ 4 คนแล้วในการแข่งขันนี้");
          } else {
            this.db
              .collection(
                form.value.contestid + "/match/" + this.matchid + "/player",
                ref => ref.where("committeeid", "==", "").limit(4)
              )
              .snapshotChanges()
              .subscribe(list => {
                if (list.length < 1) {
                  // alert("ไม่มีผู้เล่น");
                } else {
                  console.log("จำนวน => ", list.length);
                  this.playerList = list.map(a => {
                    let dat;
                    dat = a.payload.doc.data();
                    dat.id = a.payload.doc.id;
                    dat.refpath = a.payload.doc.ref.path;
                    a.payload.doc.ref.update(
                      "committeeid",
                      document.getElementById("uid").innerText
                    );
                    return dat;
                  });
                  console.log(this.playerList);
                }
              });
          }
        });
    }
  }
}
