import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { AppFunc } from "../entities/app-func.model";
import { Reference } from "src/service/reference.model";
import { User } from "../entities/user.model";
import { AppVersion } from "../entities/app-version.model";

@Injectable()
export class AppVersionModel implements OnInit{ 
    static className(){        
        return "AppVersionModel";
    }

    private appVersions:AppVersion[] = [];
    private appVersionKeys:AppVersion[] = [];
    public result:Result<AppVersion>;  
     
    

    constructor(private restService:RestService<AppVersion>){
        this.result = new Result(false, '', new AppVersion("0.01", 100, 0), 0);
    }
   
    ngOnInit(): void { }

    getAppVersionKeys():AppVersion[]{
        return this.appVersionKeys;
    }
    getAppVersions():AppVersion[]{
        return this.appVersions;
    }
}