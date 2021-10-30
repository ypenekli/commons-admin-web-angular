import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { App } from "../entities/app.model";
import { Reference } from "src/service/reference.model";
import { User } from "../entities/user.model";

@Injectable()
export class AppModel implements OnInit{ 

    private apps:App[]=[];    
    public result:Result<App>;  
    static targets:Reference<string>[] = [
        new Reference<string>("targetWEB", $localize`:Target@@target_web:Web`),
        new Reference<string>("targetWIN", $localize`:Target@@target_desktop:Desktop`),
        new Reference<string>("targetMOBILE", $localize`:Target@@target_mobile:Mobile`),
    ];

    constructor(private restService:RestService<App>){
        this.result = new Result(false, '', new App("-1"), 0);
    }

    
    static className(){        
        return this.name;
    }
   
    ngOnInit(): void { }

    getApps():App[]{
        return this.apps;
    }
    getApp(id: string): App {
        console.log("id:" + id);
        if(id != null && id != '-1'){
            let a = this.apps.find(p => p.id == id);
            if(a)
             return a;
        }            
        let idx:number = 0;
        if (this.apps != null && this.apps.length > 0)
            idx = this.apps.length;
        idx += 1;
        return new App(`0.${idx}`);
               
    }
    findApps(pUserId:number):Observable<boolean>{ 
        let userId:FnParam =  new FnParam("user_id", pUserId) ;        
        let fnName:string = this.findApps.name;
       return this.restService.getAny(AppModel.className(), fnName, '-', App.name, null, userId)         
        .pipe(map(apps => {
            this.apps = new Array();
            if(apps != null){               
                this.apps = apps.map(partial=>App.fromPlain(partial));              
            }
         return true;
    }));      
    }  
    

    saveApp(app: App, user:User):Observable<string> {
        //this.result = null;
        app = RestService.setLastUserInfo(app, user.email);  
        let isNew:boolean = app.isNew();  

        return this.restService.post(AppModel.className(), this.saveApp.name, 
            new FnParam("app", app), 
            new FnParam("user", user))      
        .pipe(map(res=>{       
            this.result = Result.fromPlain(res, new App()); 
            if(this.result.isSuccess()){
                let v = this.result.getData();
                if(v){
                    app.id = v.id;
                    app.accept();  
                }             
                if(isNew){
                    this.apps.push(app);        
                }
            }            
            return this.result.getMessage();                  
        }));
       
    }

    getSaveResult():Result<App>{
        return this.result;
    }
}