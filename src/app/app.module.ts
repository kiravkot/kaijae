import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";

import {
  AppRoutingModule,
  routingComponent
} from "./app-routing/app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./component/header/header.component";
import { HomeComponent } from "./component/home/home.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
// import { ScoreComponent } from "./component/score/score.component";
import { AddmatchComponent } from "./component/addmatch/addmatch.component";

import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { UserService } from "./service/user/user.service";
import { AuthService } from "./service/auth/auth.service";
import { AddscoreComponent } from "./component/addscore/addscore.component";
// import { SelectcontestComponent } from "./component/selectcontest/selectcontest.component";
import { CreatecontestComponent } from "./component/createcontest/createcontest.component";
import { EditmemberComponent } from "./component/editmember/editmember.component";
import { RegismatchComponent } from "./component/regismatch/regismatch.component";
import { ConfirmregisComponent } from "./component/confirmregis/confirmregis.component";
import { AddkaiComponent } from "./component/addkai/addkai.component";
import { AddjudgetoplayerComponent } from './component/addjudgetoplayer/addjudgetoplayer.component';
import { ChangepermissionComponent } from './component/changepermission/changepermission.component';
import { KaiComponent } from './component/kai/kai.component';
import { ReportpdfComponent } from './component/reportpdf/reportpdf.component';
// import { User, Player, Match, Contest } from "./user";

import { NgxGalleryModule } from 'ngx-gallery';
import { UpdatememberComponent } from './component/updatemember/updatemember.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    // ScoreComponent,
    AddmatchComponent,
    AddscoreComponent,
    routingComponent,
    // SelectcontestComponent,
    CreatecontestComponent,
    EditmemberComponent,
    RegismatchComponent,
    ConfirmregisComponent,
    AddkaiComponent,
    AddjudgetoplayerComponent,
    ChangepermissionComponent,
    KaiComponent,
    ReportpdfComponent,
    UpdatememberComponent
    // User,
    // Player,
    // Match,
    // Contest
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
