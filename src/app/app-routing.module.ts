import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePwdComponent } from './components/auth/change-pwd/change-pwd.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"changepwd", component:ChangePwdComponent},
  {path:"addacc", component:LoginComponent},
  {path:"user/:mode/:id", component:UserFormComponent},
  {path:"users", component:UserListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
