import { Injectable, OnInit } from "@angular/core";
import { Reference } from "src/service/reference.model";
import { AppFunc } from "./entities/app-func.model";
import { Group } from "./entities/group.model";
import { User } from "./entities/user.model";

@Injectable()
export class Session implements OnInit{ 

    constructor(){
        this.appId = "0.1";
        this.setAppName($localize`:AppName@@@@app_name:APP/USER MANAGEMENT`);
      this.setMenuList(null); 
    }

    private appId:string;
    private appName:string;
    private funcName:string;
    private token:string;
    private user:User;
    private rootMenuList:Group[];
    private menuList:AppFunc[];
    private menu:AppFunc[];
    public static routes:Map<string, string> = new Map([
      [".UserAUDL", "/users"],
      [".AppAUL", "/apps"],
      [".GroupAUDL", "/groups"],
      [".CommonsAUL", "/commons"],
      [".Queries", "/queries"],
      [".Login", "/login"],
      [".AddAccount", "/addacc"],
      [".ChangePassword", "/changepwd"]
    ]);
    
    
    static FORM_MODE:Reference<string>[] = [
      new Reference<string>("addnew", $localize`:Mode@@addnew:Add New`),
      new Reference<string>("edit", $localize`:Mode@@edit:Edit`),
      new Reference<string>("list", $localize`:Mode@@list:List`),
      new Reference<string>("view", $localize`:Mode@@view:View`)
  ];

    ngOnInit(): void { }
    

    getAppId():string{
        return this.appId;
    }

    getAppName():string{
        return this.appName;
    }
    setAppName(appName:string){
      this.appName = appName;
      this.funcName = appName;
    }

    getFuncName():string{
        return this.funcName;
    }
    
    setFuncName(funcName:string){
      this.funcName = funcName;
    }

    getToken():string{
        return this.token;
    }
    setToken(token:string){
        this.token = token;
    }

    getUser():User{
        return this.user;
    }
    setUser(user:User){
      this.user = user;
    }
      
    getRootMenuList():Group[]{
      return this.rootMenuList;
    }
    setRootMenuList(list:Group[]){
      this.rootMenuList = list;
    }
    
    getMenuList():AppFunc[]{
      return this.menuList;
    }
    setMenuList(list:AppFunc[]){
      this.menuList = [];
       this.menu = [];
       if(list != null){
        this.menuList = list;
          list.forEach(e => {           
            if(e.level == 2){
              this.menu.push(e);
            }
          });             
          let home:AppFunc = new AppFunc();
          home.id = "0.98";
          home.parentId = "0.1";
          home.name = "HESABIM";
          home.level = 2;
   
          let sec:AppFunc = new AppFunc();
          sec.id = "0.99";
          sec.parentId = "0.98";
          sec.name = "??ifre De??i??tir";
          sec.url = ".ChangePassword"
          sec.level = 3;
   
          this.menuList.push(home);
          this.menu.push(home);
          this.menuList.push(sec);      
       } 
         
       

    }
    getMenu():AppFunc[]{
        return this.menu;
    }
    getMenuSubList(parentId:string):AppFunc[]{
      let subMenu = [];
      if(this.menuList != null){
        this.menuList.forEach(e => {            
          if(e.parentId == parentId){
            subMenu.push(e);
          }
      });
      }      
      return subMenu;
    }

    get isAuthenticated(){
        return this.user != null;
    } 

    clear(){
        this.token = null;
        this.user = null;
        this.menuList = null;
        this.menu = null;
        this.rootMenuList = null;
    }    
}