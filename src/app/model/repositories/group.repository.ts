import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { Group } from "../entities/group.model";
import { User } from "../entities/user.model";

@Injectable()
export class GroupModel implements OnInit{ 

    private groups:Group[] = [];
    public result:Result<Group>;  

    constructor(private restService:RestService<Group>){
        this.result = new Result(false, '', new Group(-1), 0);
    }

    
    static className(){        
        return this.name;
    }
   
    ngOnInit(): void { }
    
    getGroup(id: number): Group {
        if(id != null && id > -1){
            let g = this.groups.find(p => p.id == id);
            if(g){
                return g;
            }
        }
        return new Group(-1);
    }

    public getGroups():Group[]{
        return this.groups;
    }

    findUserGroupList(pUserId:number):Observable<boolean>{        
        let userId :FnParam = new FnParam("userid", pUserId) ; 
       
        let fnName:string = this.findUserGroupList.name;
        return this.restService.getAny(GroupModel.className(), fnName, '-', Group.name, null, userId) 
        .pipe(map(groups => { 
            this.groups = new Array();
            if(groups != null){               
                this.groups = groups.map(partial=>Group.fromPlain(partial));             
            }
         return true;
       }));          

    } 

    findAppGroupList(pUserId:number, pAppId:string):Observable<boolean>{ 
        let appAd:FnParam =  new FnParam("appid", pAppId) ;         
        let userId :FnParam = new FnParam("userid", pUserId) ; 
       
        let fnName:string = this.findAppGroupList.name;
        return this.restService.getAny(GroupModel.className(), fnName, '-', Group.name, null, appAd, userId) 
        .pipe(map(groups => { 
            this.groups = new Array();
            if(groups != null){               
                this.groups = groups.map(partial=>Group.fromPlain(partial));             
            }
         return true;
       }));  
    } 
    

    saveGroup(group: Group, user:User):Observable<string> {
        //this.result = null;
        group = RestService.setLastUserInfo(group, user.email);   
        let isNew:boolean = group.isNew();         
       return this.restService.post(GroupModel.className(),  this.saveGroup.name, 
            new FnParam("group", group), 
            new FnParam("user", user))            
       .pipe(map(res=>{       
            this.result = Result.fromPlain(res, new Group()); 
            if(this.result.isSuccess()){
                let v = this.result.getData();
                if(v){
                    group.id = v.id;
                    group.accept();  
                }            
                if(isNew){
                    this.groups.push(group);        
                }
            }            
            return this.result.getMessage();                  
       }));
       
    }

    getSaveResult():Result<Group> | null{
        return this.result;
    }
}