import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePwdComponent } from './components/auth/change-pwd/change-pwd.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"changepwd", component:ChangePwdComponent},
  {path:"addacc", component:LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
