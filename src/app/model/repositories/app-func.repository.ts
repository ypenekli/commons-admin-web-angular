import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { AppFunc } from "../entities/app-func.model";
import { Reference } from "src/service/reference.model";
import { User } from "../entities/user.model";

@Injectable()
export class AppFuncModel implements OnInit{ 
    static className(){        
        return "AppFuncModel";
    }

    private appFuncs:AppFunc[] = [];
    public result:Result<AppFunc>;  
     
    static targets:Reference<string>[] = [
        new Reference<string>("targetAUDL", $localize`:Target@@target_audl:Add New/Edit/Delete/List`),
        new Reference<string>("targetAUD", $localize`:Target@@target_aud:Add New/Edit/Delete`),
        new Reference<string>("targetL", $localize`:Target@@target_list:List`),
        new Reference<string>("targetView", $localize`:Target@@target_view:View`),
    ];

    constructor(private restService:RestService<AppFunc>){
        this.result = new Result(false, '', new AppFunc("-1"), 0);
    }
   
    ngOnInit(): void { }

    getAppFuncs():AppFunc[]{
        return this.appFuncs;
    }

    findGroupAppFuncs(pGroupId:number, pAppId:string):Observable<boolean>{ 
        let appAd:FnParam =  new FnParam("appid", pAppId) ; 
        let groupId :FnParam = new FnParam("groupid", pGroupId) ;         
        let fnName:string = "findGroupAppFuncs";
        
       return this.restService.getAny(AppFuncModel.className(), fnName, '-', (new AppFunc()).getClassName(), appAd, groupId)         
        .pipe(map(appFuncs => {
            this.appFuncs = new Array();
            if(appFuncs != null){               
                this.appFuncs = appFuncs.map(partial=>AppFunc.fromPlain(partial));              
            }
         return true;
        }));      
    } 

    findAppFuncs(pParentId:string):Observable<boolean>{          
        let parentId :FnParam = new FnParam("parentid", pParentId) ;         
        let fnName:string = "findAppFuncs";
       return this.restService.getAny(AppFuncModel.className(), fnName, '-', (new AppFunc()).getClassName(), parentId)         
        .pipe(map(appFuncs => {
            this.appFuncs = new Array();
            if(appFuncs != null){               
                this.appFuncs = appFuncs.map(partial=>AppFunc.fromPlain(partial));              
            }
         return true;
        }));      
    }

    saveFunc(appFunc: AppFunc, groupId:number, user:User):Observable<string> {
        //this.result = null;
        appFunc = RestService.setLastUserInfo(appFunc, user.email);  
        let isNew:boolean = appFunc.isNew(); 

        return this.restService.post(AppFuncModel.className(), "saveFunc", 
            new FnParam("app_func", appFunc), 
            new FnParam("group_id", groupId), 
            new FnParam("user", user) )      
        .pipe(map(res=>{       
            this.result = Result.fromPlain(res, new AppFunc()); 
            if(this.result.isSuccess()){
                let a = this.result.getData();
                if(a){
                    appFunc.id = a.id;
                    appFunc.accept(); 
                }                           
                if(isNew){
                    this.appFuncs.push(appFunc);        
                }
            }            
            return this.result.getMessage();                  
        }));
       
    }


    public static getSubFuncs(parentId:string, appFuncs:AppFunc[]):AppFunc[]{
        let subFuncs:AppFunc[] = [];
        appFuncs.forEach(row=>{            
            if(row.parentId == parentId)
                subFuncs.push(row);            
        })
        return subFuncs;
    }

    public static getSubFuncsCount(hierarchy:string, appFuncs:AppFunc[]):number{
        let count:number = 0;
        appFuncs.forEach(row=>{            
            if(row.hierarchy != hierarchy && row.hierarchy.startsWith(hierarchy)){
                count++; 
            }      
        })  
        return count;
    }   
}