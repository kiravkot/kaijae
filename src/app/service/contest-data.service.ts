import { Injectable, EventEmitter } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { User, Contest, Match } from "src/app/user";
import { PathEventArgs } from "../component/selectcontest/selectcontest.component";
@Injectable({
  providedIn: "root"
})
export class ContestDataService {
  pathSource = new BehaviorSubject<string>("asdasd");
  currentpath = this.pathSource.asObservable();
  userscollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  contestcollection: AngularFirestoreCollection<Contest>;
  contest: Observable<Contest[]>;
  matchcollection: AngularFirestoreCollection<Match>;
  match: Observable<Match[]>;
  userDoc: AngularFirestoreDocument<User>;
  path = new EventEmitter();
  pathstring: PathEventArgs = {
    path: ""
  };
  constructor(public _afs: AngularFirestore) {
    // this._data.currentpath.subscribe(message => (this.message = message));
    this.userscollection = this._afs.collection("Member");
    this.contestcollection = this._afs.collection("contest", ref =>
      ref.where("status", "==", true).limit(10)
    );
    this.users = this.userscollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );
    this.contest = this.contestcollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Contest;
          data.path = a.payload.doc.ref.path;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );
    // this.match = this.contestcollection.snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(a => {
    //       const data = a.payload.doc.data() as Match;
    //       data.uid = a.payload.doc.id;
    //       return data;
    //     });
    //   })
    // );
  }

  sendpath(message: string) {
    this.pathSource.next(message);
  }

  // sendpath(data) {
  //   this.path.emit(this.pathstring);
  // }

  getUsers() {
    return this.users;
  }
  getContests() {
    return this.contest;
  }
  getmatchwithuid(uid: any) {
    this.matchcollection = this._afs
      .collection("contest")
      .doc(uid)
      .collection("Member");
    this.match = this.matchcollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(e => {
          const data1 = e.payload.doc.data() as Match;
          data1.uid = e.payload.doc.id;
          return data1;
        });
      })
    );
  }
  getMatch() {
    return this.match;
    // this.matchcollection = this._afs
    //   .collection("contest")
    //   .doc(uid)
    //   .collection("Member");
    // this.match = this.matchcollection.snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(a => {
    //       const data = a.payload.doc.data() as Match;
    //       data.uid = a.payload.doc.id;
    //       return data;
    //     });
    //   })
    // );
  }
  // addUser(user) {
  //   this.userscollection.add(user);
  // }
  // deleteUser(user) {
  //   this.userDoc = this._afs.doc(`Users/${user.uid}`);
  //   this.userDoc.delete();
  // }
}
