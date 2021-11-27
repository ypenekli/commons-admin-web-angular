import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/entities/group.model';
import { GroupModel } from 'src/app/model/repositories/group.repository';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'id'];
  constructor(
    private session:Session,
    private repository:GroupModel) { }

  ngOnInit(): void {
    this.session.isSearchShown = false;
    this.repository.findUserGroupList(this.session.getUser().id)
    .subscribe(res=>{});
  }

  get groups():Group[]{
    return this.repository.getGroups();
  }
}
