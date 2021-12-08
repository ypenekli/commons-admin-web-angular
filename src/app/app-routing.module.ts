import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFormComponent } from './components/apps/app-form/app-form.component';
import { AppListComponent } from './components/apps/app-list/app-list.component';
import { ChangePwdComponent } from './components/auth/change-pwd/change-pwd.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CommCodeFormComponent } from './components/commons/comm-code-form/comm-code-form.component';
import { CommCodeListComponent } from './components/commons/comm-code-list/comm-code-list.component';
import { GroupFormComponent } from './components/groups/group-form/group-form.component';
import { GroupListComponent } from './components/groups/group-list/group-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"changepwd", component:ChangePwdComponent},
  {path:"addacc", component:LoginComponent},
  {path:"user/:mode/:id", component:UserFormComponent},
  {path:"users", component:UserListComponent},
  {path:"app/:mode/:id", component:AppFormComponent},
  {path:"apps", component:AppListComponent},
  {path:"app_funcs/:parent_id", component:AppFormComponent},
  {path:"group/:mode/:id", component:GroupFormComponent},
  {path:"groups", component:GroupListComponent},
  {path:"commons", component:CommCodeListComponent},
  {path:"commons/:parent_id", component:CommCodeListComponent},
  {path:"commons2/:parent_id", component:CommCodeListComponent},
  {path:"commons3/:parent_id", component:CommCodeListComponent},
  {path:"common/:mode/:id/:parent_id", component:CommCodeFormComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
