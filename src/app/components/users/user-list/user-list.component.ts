import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/entities/user.model';
import { UserModel } from 'src/app/model/repositories/user.repository';
import { SearchEvent } from 'src/app/model/search-event';
import { Session } from 'src/app/model/session.model';
import { Pager } from 'src/service/pager.model';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss', './user-list.component.css']
})
export class UserListComponent implements OnInit {
  public errorMessage:string = '';
  displayedColumns: string[] = ['image', 'name', 'id'];
  constructor(  
    private session: Session,
    private userModel:UserModel,
    private toolbarSearch:SearchEvent) { 
      this.toolbarSearch.addListener("searchByName", this.findUsersByName.bind(this));
    }

  ngOnInit(): void { 
    this.session.isSearchShown = true;
    this.findUsersByName("");
  }

  get users():User[]{
    return this.userModel.getUsers();
  }

  findUsersByName(value:string){
    let pager:Pager = new Pager();
    this.userModel.findUsersByName(value, pager)
    .subscribe(res=>{
      let users:User[] = this.userModel.getUsers();
      if(users == null || users.length == 0){
        this.errorMessage = $localize`:@@no_record_found:No results found`
      }else this.errorMessage = '';
    });    
  }
  
}
