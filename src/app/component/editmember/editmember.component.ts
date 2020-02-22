import { Component, OnInit } from "@angular/core";
import { ContestDataService } from "src/app/service/contest-data.service";
import { User, Contest, Match } from "src/app/user";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "src/app/service/auth/auth.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: "app-editmember",
  templateUrl: "./editmember.component.html",
  styleUrls: ["./editmember.component.css"
]
})
export class EditmemberComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  useruid: any;
  userprofile: any;
  kailist: any;
  user: User[] = [];
  contest: Contest[] = [];
  match: Match[] = [];
  model = { firstname: "", lastname: "", mobile_no: "" };
  constructor(
    private route: ActivatedRoute,
    public _data: ContestDataService,
    private db: AngularFirestore,
    private auth: AuthService,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    document.getElementById("judge").hidden =true
    this._data.getUsers().subscribe((data: User[]) => {
      this.user = data;
      // console.log(this.user);
    });
    this._data.getContests().subscribe((data: Contest[]) => {
      this.contest = data;
      // console.log(this.contest);
    });
    this.useruid = this.route.snapshot.paramMap.get("id");
    this.getuserprofile();
    this.auth.checkstateuser()
    // this._data.getMatch().subscribe((data: Match[]) => {
    //   this.match = data;
    //   console.log(this.match);
    // });
  }
  getuserprofile() {
    // this.useruid = document.getElementById("uid").innerText;
    // this.match = this.matchcollection.snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(e => {
    //       const data1 = e.payload.doc.data() as Match;
    //       data1.uid = e.payload.doc.id;
    //       return data1;
    //     });
    //   })
    let saa = []
    let userRef = this.db
      .collection("Member")
      .doc(this.useruid)
      .snapshotChanges()
      .subscribe(doc => {
        let data = doc.payload.data();
        this.userprofile = data;
        this.userprofile.id = doc.payload.id;
        this.userprofile.ref = doc.payload.ref.path;
        console.log(this.userprofile);
        this.db.collection(doc.payload.ref.path+"/kai").snapshotChanges().subscribe(kaidoc =>{
          kaidoc.forEach(data=>{
            let kaidata:any = data.payload.doc.data()
            kaidata.id = data.payload.doc.id
            kaidata.ref = data.payload.doc.ref.path
            saa.push(kaidata)
          })
          this.kailist = saa
          console.log(this.kailist)
          this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                thumbnailsAsLinks: true
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
 
        this.galleryImages = this.galleryImages = saa.map(photo => ({
          small: photo.imgkaiRef,
          medium: photo.imgkaiRef,
          big: photo.imgkaiRef,
          description: photo.kainame,
          label: photo.imgkaiRef,
          url: "kaiedit/"+this.useruid+"/"+photo.id
        }));
        })
        // this.test()
        document
          .getElementById("imguserURL")
          .setAttribute("src", this.userprofile.imgprofileRef);
        document.getElementById("fullname").innerHTML =
          this.userprofile.fname + "  " + this.userprofile.lname;
          document.getElementById("emailaddress").innerHTML =
          this.userprofile.email
          document.getElementById("address").innerHTML =
          "ที่อยู่  "+this.userprofile.address + "  " + this.userprofile.Province
          document.getElementById("birth").innerHTML =
          "วันเกิด "+this.userprofile.birth
          document.getElementById("phonetel").innerHTML =
          "เบอร์โทร "+this.userprofile.tel

      });
  }

  getImages(data) {
    const imageUrls = [];
    for (let i = 0; i < data.length; i++) { 
      imageUrls.push({
        small: data.imgkaiRef,
        medium: data.imgkaiRef,
        big: data.imgkaiRef,
        description: data.kainame
      });
    }
    return imageUrls;
  }
  onSelectupdate() {
    var url = "editmember/"+this.useruid
    window.location.href= url
  }
  test(){
    let sss = this.router.navigate(["/kaiedit", "1111111"])
    console.log(sss)
  }
}
