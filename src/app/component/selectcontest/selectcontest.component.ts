import { Component, OnInit, Output } from "@angular/core";
import { ContestDataService } from "src/app/service/contest-data.service";
import { User, Contest, Match } from "src/app/user";
import { AngularFirestore } from "angularfire2/firestore";
import { EventEmitter } from "events";
import { RouterModule, Routes, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { element } from "protractor";
// import {@types/jquery} from '@types/jquery'
@Component({
  selector: "app-selectcontest",
  templateUrl: "./selectcontest.component.html",
  styleUrls: ["./selectcontest.component.css"]
})
export class SelectcontestComponent implements OnInit {
  @Output("change") change = new EventEmitter();
  message: string;
  user: User[] = [];
  contest: any[] = [];
  matchlist: any[] = [];
  constructor(
    private router: Router,
    public _data: ContestDataService,
    public db: AngularFirestore,
    private pathservice: ContestDataService // private router: Router
  ) {}

  onSelect(data) {
    this.router.navigate(["/score", data.path]);
  }
  ngOnInit() {
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
    // this._data.currentpath.subscribe(message => (this.message = message));
    // for (let index = 0; index < this.contest.length; index++) {
    //   const uid = this.contest[index].uid;

    //   console.log("111");
    // }
  }
  showhide(index: number) {
    var x = document.getElementById(index.toString());
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    console.log(this.contest[index].flag);
  }
  getmatch(data) {
    this.db
      .collection("contest")
      .doc(data)
      .collection("match")
      .snapshotChanges()
      .subscribe(change => {
        this.matchlist = change.map(item => {
          // console.log(item.payload.doc.ref.path);
          return {
            uid: item.payload.doc.id,
            path: item.payload.doc.ref.path,
            ...(item.payload.doc.data() as Match)
          };
        });
        console.log(this.matchlist);
      });
  }

  dada(data: string) {
    console.log(data);
    this._data.sendpath(data);
    // this.pathservice.sendpath(data);
  }
  // toggle() {
  //   $(document).ready(function() {
  //     $("ul").click(function(evt) {
  //       if (evt.target.tagName != "UL") return;
  //       $("li", this).toggle();
  //     });
  //   });
  // }
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

export interface PathEventArgs {
  path: string;
}
