import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/model/entities/app.model';
import { AppModel } from 'src/app/model/repositories/app.repository';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  constructor(
    private session:Session,
    private repository:AppModel) { }

    ngOnInit(): void {
      this.repository.findApps(this.session.getUser().id)
      .subscribe(res=>{});
    }
  
    get apps():App[]{
      return this.repository.getApps();
    }

}
