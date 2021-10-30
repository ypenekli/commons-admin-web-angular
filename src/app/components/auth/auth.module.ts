import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { UserModel } from 'src/app/model/repositories/user.repository';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Session } from 'src/app/model/session.model';
import { GroupModel } from 'src/app/model/repositories/group.repository';
import { AppFuncModel } from 'src/app/model/repositories/app-func.repository';


@NgModule({
  declarations: [LoginComponent, ChangePwdComponent, AddAccountComponent],
  imports: [
    BrowserModule,
    CommonModule,   
    FormsModule, 
    ReactiveFormsModule,    
    MatSidenavModule,
    MatListModule,    
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,    
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers:[Session, UserModel, GroupModel, AppFuncModel, CommonModel],
  exports:[LoginComponent, ChangePwdComponent, AddAccountComponent]
})
export class AuthModule { }
