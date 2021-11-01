import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';

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


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { RestService } from 'src/service/rest.service';
import { UserModel } from './model/repositories/user.repository';
import { GroupModel } from './model/repositories/group.repository';
import { AppFuncModel } from './model/repositories/app-func.repository';
import { Session } from './model/session.model';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { AppsModule } from './components/apps/apps.module';
import { GroupsModule } from './components/groups/groups.module';
import { CommonsModule } from './components/commons/commons.module';
import {  MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule, 
    FormsModule,
    HttpClientModule,  

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
    MatSnackBarModule,
    MatPaginatorModule,

    
    AuthModule,
    UsersModule,
    AppsModule,
    GroupsModule,    
    CommonsModule
  ],
  providers: [Session, RestService, UserModel, GroupModel, AppFuncModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
