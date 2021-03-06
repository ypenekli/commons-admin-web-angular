import { Injectable, OnInit } from '@angular/core';
import { RestService } from '../../../service/rest.service';
import { User } from '../entities/user.model';
import { Result } from 'src/service/result.model';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { FnParam } from 'src/service/fn-param.model';
import { Pager } from 'src/service/pager.model';

@Injectable()
export class UserModel implements OnInit{    
  
    private users:User[];
    public result:Result<User>;   

    constructor(private restService:RestService<User>){}

    
    static className(){        
        return this.name;
    }
   
    ngOnInit(): void { }
   
    getUsers():User[]{
        return this.users;
    }
    
    getUser(id: number): User {
        if(id != null && id > -1)
            return this.users.find(p => p.id == id);
        else
            return new User(-1);
    }

    getSaveResult():Result<User>{
        return this.result;
    }

    findUsersByName(pName:string, pager:Pager):Observable<boolean>{             
        if(!!pName){            
            pName = "%" + pName + "%";
        }else pName = "" ;
        let name :FnParam = new FnParam("name", pName)  
       
        let fnName:string = this.findUsersByName.name;
       return this.restService.getAny(UserModel.className(), fnName, '-', User.name, pager, name) 
        .pipe(map(users=>{ 
           this.users = new Array();
           if(users != null){              
              this.users = users.map(partial=>User.fromPlain(partial));
           }
           return true;
        }));
    }

    save(user: User, userName:string):Observable<string> {
        this.result = null;
       user = RestService.setLastUserInfo(user, userName);
       let isNew:boolean = user.isNew();      
       let fnName:string = this.save.name;           
       return this.restService.postOne(UserModel.className(), fnName, user )      
       .pipe(map(res=>{       
        this.result = Result.fromPlain(res, new User()); 
        if(this.result.isSuccess()){
            user.id = this.result.getData().id;
            user.accept();            
            if(isNew){
                this.users.push(user);        
            }
        }
        return this.result.getMessage();                  
       }));
       
    }

    authenticate(username: string, password: string):Observable<Result<User>>{
        let type :FnParam = new FnParam("className", User.name);
        let uname :FnParam = new FnParam("username", username);
        let upwd:FnParam = new FnParam("password", password);
        let appid:FnParam= new FnParam("appid", "0.1");
        let remaddress :FnParam = new FnParam("remaddres", window.location.origin);

        let handler:string = UserModel.className();
        let fnName:string = "login";   

       return this.restService.post(handler, fnName, type, uname, upwd, appid, remaddress)
       .pipe(map(res => {
        return Result.fromPlain(res, new User());
      }));
    }

    changePassword(pwdUser: User, newPassword: string, updateUser:User):Observable<Result<User>>{
        let type :FnParam = new FnParam("className", User.name);
        let pwduser :FnParam = new FnParam("pwduser", pwdUser);
        let upwd:FnParam = new FnParam("password", newPassword);
        let updateuser :FnParam = new FnParam("updateuser", updateUser);
        let remaddress :FnParam = new FnParam("remaddres", window.location.origin);

        let handler:string = UserModel.className();
        let fnName:string = "changePassword";   

       return this.restService.post(handler, fnName, type, pwduser, upwd, updateuser, remaddress)
       .pipe(map(res => {
        return Result.fromPlain(res, new User());
      }));
    }
}