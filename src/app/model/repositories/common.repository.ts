import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { Common } from "../entities/common.model";
import { User } from "../entities/user.model";

@Injectable()
export class CommonModel implements OnInit{ 

    public static  PARENT_ID_CITY_TR:number = 1020000000;
	public static  PARENT_ID_PROFESSION:number = 1030000000;
	public static  PARENT_ID_TITLE:number = 1040000000;
	public static  PARENT_ID_POSITION:number = 1050000000;

    private commons:Common[];
    public result:Result<Common>;  

    constructor(private restService:RestService<Common>){}

    
    static className(){        
        return this.name;
    }
   
    ngOnInit(): void { }

    public getCommons():Common[]{
        return this.commons;
    }

    getCommon(id: number): Common {
        if(id != null && id > -1)
            return this.commons.find(p => p.id == id);
        else
            return new Common(-1);
    }

    findByParent(pParentId:number):Observable<boolean>{ 
        let parentId:FnParam =  new FnParam("parent_id", pParentId) ;        
        let fnName:string = this.findByParent.name;
        return this.restService.getAny(CommonModel.className(), fnName, '-', Common.name, null, parentId) 
        .pipe(map(commons => { 
            this.commons = new Array();
            if(commons != null){                
                this.commons = commons.map(partial=>Common.fromPlain(partial));             
            }
         return true;
       }));     

    } 

    saveCommon(common: Common, user:User):Observable<string> {
        this.result = null;
        console.log("common :" + common.get("abrv"));
        common = RestService.setLastUserInfo(common, user.email);         
        let isNew:boolean = common.isNew();         
       return this.restService.post(CommonModel.className(),  this.saveCommon.name, 
            new FnParam("common", common), 
            new FnParam("user", user))            
       .pipe(map(res=>{       
            this.result = Result.fromPlain(res, new Common()); 
            if(this.result.isSuccess()){
                common.id = this.result.getData().id;
                common.accept();            
                if(isNew){
                    this.commons.push(common);        
                }
            }            
            return this.result.getMessage();                  
       }));
       
    }

    getSaveResult():Result<Common>{
        return this.result;
    }
}