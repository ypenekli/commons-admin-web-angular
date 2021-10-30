import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserModel } from 'src/app/model/repositories/user.repository';
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
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModel } from 'src/app/model/repositories/common.repository';



@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule, 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule, 
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
    MatTableModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers:[UserModel, CommonModel],
  exports:[UserListComponent, UserFormComponent]
})
export class UsersModule { }
