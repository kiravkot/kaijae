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
  selector: "app-createcontest",
  templateUrl: "./createcontest.component.html",
  styleUrls: ["./createcontest.component.css"]
})
export class CreatecontestComponent implements OnInit {
  firedb: any;
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
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private userService: UserService,
    private _data: ContestDataService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    let data;
    data = form.value;
    data.status = true;
    this.db.collection("contest").add(data).then(()=>window.location.href="/add-match");
  }
}
