import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { ContestDataService } from "src/app/service/contest-data.service";
import { Contest, Match, Player } from "src/app/user";
import { NgForm } from "@angular/forms";
// import { QuerySnapshot } from "@google-cloud/firestore";
import { map } from "rxjs/operators";

@Component({
  selector: "app-confirmregis",
  templateUrl: "./confirmregis.component.html",
  styleUrls: ["./confirmregis.component.css"]
})
export class ConfirmregisComponent implements OnInit {
  contest: Contest[] = [];
  match: Match[] = [];
  playerlist: Player[] = [];
  aa;
  constructor(private db: AngularFirestore, private _data: ContestDataService) {
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
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

  comfirm(ref: string) {
    const refpath = ref.split("/");
    this.db.firestore
      .collection(refpath[0])
      .doc(refpath[1])
      .collection(refpath[2])
      .doc(refpath[3])
      .collection(refpath[4])
      .doc(refpath[5])
      .update({ status: true });
  }

  getplayer(username: NgForm) {
    const s = this.db
      .collection("Member", ref =>
        ref.where("email", "==", username.value.username)
      )
      .get()
      .subscribe(QuerySnapshot => {
        QuerySnapshot.forEach(doc => {
          console.log(doc.id);
          const q = this.db
            .collectionGroup("player", ref =>
              ref.where("id", "==", doc.id).where("status", "==", false)
            )
            .snapshotChanges()
            .pipe(
              map(change => {
                return change.map(a => {
                  let strcontest = username.value.contestid.split("/");
                  let strref = a.payload.doc.ref.path.split("/");
                  if (strref[1] == strcontest[1]) {
                    let data = a.payload.doc.data() as Player;
                    data.uid = a.payload.doc.id;
                    data.refpath = a.payload.doc.ref.path;
                    // console.log(data);
                    return data;
                  }
                });
              })
            );
          q.subscribe(data => {
            for (let index = 0; index < data.length; index++) {
              if (data[index] == null) {
                data.splice(index, 1);
                index--;
              } else {
                let strmatchref = data[index].refpath.split("/");
                console.log(strmatchref);
                this.db.firestore
                  .collection(strmatchref[0])
                  .doc(strmatchref[1])
                  .collection(strmatchref[2])
                  .doc(strmatchref[3])
                  .get()
                  .then(doc => {
                    data[index].data = doc.data();
                    data[index].data.type = this.changeoption(doc.data().type);
                    // if (data[index].data.type == "cheer") {
                    //   data[index].data.type = "เชียร์ได้";
                    // } else {
                    //   data[index].data.type = "ห้ามเชียร์";
                    // }
                    console.log(doc.data());
                  });

                this.playerlist = data;
              }
            }

            console.log(this.playerlist);
          });
        });
      });
    // console.log(s);
  }
}
