import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Session } from 'src/app/model/session.model';
import { User } from 'src/app/model/entities/user.model';
import { Group } from 'src/app/model/entities/group.model';
import { AppFunc } from 'src/app/model/entities/app-func.model';
import { Router, RouterOutlet } from '@angular/router';
import { SearchEvent } from '../model/search-event';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
  constructor(
    private session:Session,
    private router:Router,
    private breakpointObserver: BreakpointObserver,
    private toolbarSearch:SearchEvent
    ) {}

    get user():User{
      return this.session.getUser();
    }
    
    get rootMenuList():Group[]{
      return this.session.getRootMenuList();
    }
  
    get menu():AppFunc[]{
      return this.session.getMenu();
    }
  
    get isSearchShown():boolean{
      return this.session.isSearchShown;
    }
    
    getMenuSubList(parentId:string):AppFunc[]{
      return this.session.getMenuSubList(parentId);
    }
  
    getUrl(key:string){    
      if(!Session.routes.has(key))
        return "/auth";
      return Session.routes.get(key);     
    }
    get appName(){
      return this.session.getAppName();
    }
    get funcName(){
      return this.session.getFuncName();
    }
  
    get userName() {
      if(this.session.isAuthenticated ){
        let u = this.session.getUser();
        if(u)
          return u.name;
      }return "Menü";
    }
    
    get isAuthenticated(){
      return this.session.isAuthenticated;
    }
  
    close(drawer:any, subitem?:AppFunc){
      if(subitem!= null){
        this.session.setFuncName(subitem.name);
      }
      this.isHandset$.subscribe(close=>{
        if(close === true){
          drawer.close();
        }
      }) 
    }
  
    logout(drawer:any){
     this.session.clear;   
     // window.localStorage.clear;     
      this.router.navigateByUrl('/login')
      .then((value)=>{
        window.location.reload(); 
      }
      );   
    }
    
    openSearch() {
       this.toolbarSearch.callEvent("openSearch");    
    }
  }