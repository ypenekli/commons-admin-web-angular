import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppFunc } from 'src/app/model/entities/app-func.model';
import { Group } from 'src/app/model/entities/group.model';
import { AppFuncModel } from 'src/app/model/repositories/app-func.repository';
import { GroupModel } from 'src/app/model/repositories/group.repository';
import { UserModel } from 'src/app/model/repositories/user.repository';
import { Session } from 'src/app/model/session.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup | any;
  public username : FormControl | any;
  public password : FormControl | any;
  public errorMessage:string = '';

  constructor(    
    private session: Session,
    private router:Router,
    private userModel:UserModel,
    private groupModel:GroupModel,
    private appFuncModel:AppFuncModel) {   }

  ngOnInit(): void {  
    this.form = new FormGroup({
      username : new FormControl('', [
        Validators.required,
        Validators.max(60),
        Validators.email,
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.min(5),
      ]),
    });  
  }
  
  hasError(controlName: string, errorName: string){
    return this.form.controls[controlName].hasError(errorName);
  }

  findMenu(){
    let appId :string = this.session.getAppId();
    let userId:number = this.session.getUser().id;
    this.groupModel.findAppGroupList(userId, appId)
    .subscribe(res=>{
      let groups:Group[] = this.groupModel.getGroups();     
      if(groups != null && groups.length > 0){
        let root:Group = groups[0];
        this.session.setRootMenuList(groups);        
        this.appFuncModel.findGroupAppFuncs(root.id, appId)
        .subscribe(res=>{
          let list:AppFunc[]=this.appFuncModel.getAppFuncs();
          if(list != null){
            this.session.setMenuList(list);
          }
        }
        )
      }
      
    })
  }

  public login = (form:any) => {
    console.log(form);
    if(this.form.valid){
      this.userModel.authenticate( form.username, form.password)
      .subscribe(res=>{
        if(res.isSuccess()){
          let user = res.getData();
          if(user){
            this.session.setUser(user)
            this.session.setToken("<bearer>");
            this.findMenu();
            this.router.navigateByUrl('/users');

          }
        }
        this.errorMessage = res.getMessage();
      })
    }
  }
  public onCancel = () => {
    this.router.navigateByUrl('/');
  }
}
