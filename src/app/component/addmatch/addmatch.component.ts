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
// import * as admin from "firebase-admin";

import { UserService } from "src/app/service/user/user.service";
import { ContestDataService } from "src/app/service/contest-data.service";
import { User, Contest, Match } from "src/app/user";
@Component({
  selector: "app-addmatch",
  templateUrl: "./addmatch.component.html",
  styleUrls: ["./addmatch.component.css"]
})
export class AddmatchComponent implements OnInit {
  po: any;
  pathref: string;
  numOpt: number[];
  form: FormGroup;
  form1: FormGroup;
  contest: Contest[] = [];
  scoreDefault: number = 0;
  playtimeDe: number;
  counts: {};
  item: any;
  datamem: any;
  currentLesson: string;
  classes = [
    {
      name: "string",
      level: "string",
      code: "number",
      currentLesson: "2"
    }
  ];
  //MatchID: String;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private userService: UserService,
    private _data: ContestDataService
  ) {
    this.item = {
      MatchID: ""
    };
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
      console.log(this.contest);
    });
    this.currentLesson = this.classes[0].currentLesson;
    this.po = db.firestore.collection("match");
  }
  ngOnInit() {
    this.form1 = this.fb.group({
      MatchID: ["", Validators.required]
    });
    this.form = this.fb.group({
      id: [this.gencode(5)],
      name: new FormControl(),
      type: new FormControl(),
      time: new FormControl()
      // player: this.fb.array([this.createItem()])
    });
    // this.pathref = this.contest[0].path;
  }
  shuffle(o: number[]) {
    for (
      var j: number, x: number, i = o.length;
      i;
      j = Math.random() * i, x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
  gencode(length) {
    var result = "";
    // const characters = RegExp(/^[a-zA-Z0-9-]$/)
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  checkgencode() {
    this.po
      .where("id", "==", this.form.value.MatchID)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
        } else {
          var newcode = this.gencode(5);
          this.form.get("MatchID").patchValue({ newcode });
        }
      });
  }
  genID() {
    var counts = [];
    var s = 0;
    for (var i = 0; i < this.form.value.player.length; i++) {
      counts[i] = this.randomInt(1, 100);
    }
    console.log(counts);
    for (var q = 0; q < this.form.value.player.length; q++) {
      this.checkgen(counts);
    }
    console.log(counts);
    for (var w = 0; w < this.form.value.player.length; w++) {
      (this.form.get("player") as FormArray)
        .at(w)
        .patchValue({ playerid: counts[w] });
    }
    console.log(this.form.get("player") as FormArray);
    // return counts;
    // console.log(this.shuffle(counts));
  }
  checkgen(counts) {
    for (var s = 0; s < counts.length; s++) {
      for (var k = 0; k < counts.length; k++) {
        // console.log("num" + s + " : " + counts[s]);
        // console.log("num" + k + " : " + counts[k]);
        if (s != k && counts[s] == counts[k]) {
          console.log("duplicate" + counts[s]);
          counts[k] = this.randomInt(1, 100);
          console.log(counts);
        }
      }
    }
  }
  createItem() {
    return this.fb.group({
      playerid: [this.randomInt(1, 100)],
      playername: new FormControl(),
      score: [this.scoreDefault]
    });
  }
  getuid(ID: string) {
    // let admin = require("firebase-admin");
    this.po.where("MatchID", "==", ID).onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        console.log("ไม่เจอข้อมูล");
      } else {
        querySnapshot.forEach(doc => {
          this.datamem = doc.id;
          console.log(this.datamem);
        });
      }
    });
  }

  addcollectionplayer(ID: string) {
    // let admin = require("firebase-admin");
    this.po.where("MatchID", "==", ID).onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        console.log("ไม่เจอข้อมูล");
      } else {
      }
    });
  }
  dis() {
    document.getElementById("playerqu").hidden = true;
  }
  randomInt(min: number, max: number) {
    var sum = Math.floor(Math.random() * (max - min + 1)) + min;
    // this.counts.push(sum);
    return sum;
  }
  addNext() {
    (this.form.controls["player"] as FormArray).push(this.createItem());
  }
  addmatch() {
    this.po.where("id", "==", this.form.value.id).onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        this.item.id = this.form.value.id;
        this.db.firestore.collection("match").add(this.item).finally(()=>{});
        this.getuid(this.form.value.id);
        this.currentLesson = "2";
        console.log("เพิ่มข้อมูลสำเร็จ");
      } else {
        querySnapshot.forEach(doc => {
          // alert("มีข้อมูลอยู่แล้ว");
          console.log("มีข้อมูลอยู่แล้ว");
        });
      }
    });
  }
  addplayer(id) {
    for (var i = 0; i < this.form.value.player.length; i++) {
      this.db.firestore
        .collection("match")
        .doc(id)
        .collection("player")
        .add(this.form.value.player[i]);
    }
  }
  submit(path: NgForm) {
    console.log(path.value.contestid);
    this.item.id = this.form.value.id;
    console.log(this.item);
    this.db.firestore
      .collection(path.value.contestid + "/match")
      .add(this.form.value).then(()=>alert("เพิ่มข้อมูลสำเร็จ")).catch(err=>alert(err));
    // this.checkgencode();
    console.log(this.form.value);
    // this.getuid(this.form.value.id);
  }

  deleteItem(index) {
    (this.form.controls["player"] as FormArray).removeAt(index);
  }

  tableCreate(num: number) {
    console.log(num);
    //body reference

    var body = document.getElementsByTagName("body")[0];
    var form = document.createElement("form");
    //<form #regisform="ngForm" (ngSubmit)="addregis(regisform)">
    document.body.appendChild(form);
    // create elements <table> and a <tbody>

    //var tbl = document.createElement("table");
    //var tblBody = document.createElement("tbody");

    // cells creation
    for (var j = 1; j <= num; j++) {
      // table row creation
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "form-group");
      var newlbl = document.createElement("label");
      newlbl.textContent = "หมายเลขผู้เข้าแข่งขันลับดับที่" + j;
      newlbl.setAttribute("for", "memID" + j);
      var newtxt = document.createElement("input");
      newtxt.setAttribute("type", "text");
      newtxt.setAttribute("class", "form-control");
      newtxt.setAttribute("name", "memID" + j);
      newDiv.appendChild(newlbl);
      newDiv.appendChild(newtxt);
      form.appendChild(newDiv);
      //var row = document.createElement("tr");

      //for (var i = 0; i < 3; i++) {
      // create element <td> and text node
      //Make text node the contents of <td> element
      // put <td> at end of the table row
      //var cell = document.createElement("td");
      //var cellText = document.createTextNode("cell is row " + j + ", column " + i);

      //cell.appendChild(cellText);
      //row.appendChild(cell);
      //}

      //row added to end of table body
      //tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    //tbl.appendChild(tblBody);
    // put <table> in the <body>
    //body.appendChild(newDiv);
    // tbl border attribute to
    //tbl.setAttribute("border", "2");
  }
}
