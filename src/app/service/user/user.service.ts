import { Injectable } from "@angular/core";
//import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "angularfire2/firestore";
import { HttpClient } from "@angular/common/http";
import { ImplicitReceiver } from "@angular/compiler";
import { from } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserService {
  user: any;
  score: any;
  public co: any;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user = this.db.firestore.collection("user");
    this.score = this.db.firestore.collection("match");
  }

  addScoreToFirebase(data) {
    this.score.add(data);
  }

  getmatch() {
    var valure: number;
    var matchRef = this.score.where("matchID", "==", "555");
    matchRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().score1);
        this.co = doc.data().score1;
      });
    });
  }

  getscore1() {
    var citiesRef = this.score.where("matchID", "==", "555");
    citiesRef
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data().score1);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  setScore1(data, score1) {
    console.log(this.score.doc(data));
    //this.score.doc(data).update({score1});
  }
  setScore2(data, score2) {
    this.score.doc(data).update({ score2 });
  }
  setScore3(data, score3) {
    this.score.doc(data).update({ score3 });
  }
  setScore4(data, score4) {
    this.score.doc(data).update({ score4 });
  }

  addDataToFirebase(data) {
    this.user.add(data);
  }

  getDataFromFirebase() {
    var citiesRef = this.user;
    citiesRef
      .where("fname", "==", "kamol")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    /*this.user.onSnapshot(function(querySnapshot){
      querySnapshot.foreach(function(doc){
        $("#listgroup").append('<li>'++'</li>')
      })
    })*/

    //

    //  ส่วนของ header
  }
}
