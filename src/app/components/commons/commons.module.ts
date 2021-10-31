import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';;
import { CommCodeFormComponent } from './comm-code-form/comm-code-form.component';
import { CommCodeListComponent } from './comm-code-list/comm-code-list.component';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [CommCodeFormComponent, CommCodeListComponent],
  imports: [  
    CommonModule, 
    BrowserModule, 
    FormsModule, 
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
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [CommonModel],
})
export class CommonsModule { }
