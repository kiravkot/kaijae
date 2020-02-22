import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../component/home/home.component";
import { RegisterComponent } from "../component/register/register.component";
import { LoginComponent } from "../component/login/login.component";
import { ScoreComponent } from "../component/score/score.component";
import { AddmatchComponent } from "../component/addmatch/addmatch.component";
import { AddscoreComponent } from "../component/addscore/addscore.component";
import { HeaderComponent } from "../component/header/header.component";
import { EditmemberComponent } from "../component/editmember/editmember.component";
import { CreatecontestComponent } from "../component/createcontest/createcontest.component";
import { SelectcontestComponent } from "../component/selectcontest/selectcontest.component";
import { RegismatchComponent } from "../component/regismatch/regismatch.component";
import { ConfirmregisComponent } from "../component/confirmregis/confirmregis.component";
import { AddkaiComponent } from "../component/addkai/addkai.component";
import { AddjudgetoplayerComponent } from "../component/addjudgetoplayer/addjudgetoplayer.component";
import { ChangepermissionComponent } from "../component/changepermission/changepermission.component";
import { KaiComponent } from "../component/kai/kai.component"
import { ReportpdfComponent } from '../component/reportpdf/reportpdf.component';
import { UpdatememberComponent } from '../component/updatemember/updatemember.component';
const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  // { path: "score", component: ScoreComponent },
  { path: "score/:id", component: ScoreComponent },
  { path: "header", component: HeaderComponent },
  { path: "add-match", component: AddmatchComponent },
  { path: "add-score", component: AddscoreComponent },
  { path: "member/:id", component: EditmemberComponent },
  { path: "selectcontest", component: SelectcontestComponent },
  { path: "judgetoplayer", component: AddjudgetoplayerComponent },
  { path: "createcontest", component: CreatecontestComponent },
  { path: "regismatch", component: RegismatchComponent },
  { path: "editmember/:id", component: UpdatememberComponent },
  { path: "confirmregister", component: ConfirmregisComponent },
  { path: "changepermiss", component: ChangepermissionComponent },
  { path: "kai", component: AddkaiComponent },
  { path: "kaiedit/:uid/:kaiid", component: KaiComponent },
  { path: "report", component: ReportpdfComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  //declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponent = [SelectcontestComponent, ScoreComponent];
