import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/entities/user.model';
import { MustMatch } from 'src/app/model/must-match';
import { UserModel } from 'src/app/model/repositories/user.repository';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-changepwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  public form: FormGroup | any;
  public errorMessage:string = '';  
  //public old_password : FormControl| any;
  //public new_password1 : FormControl| any;
  //public new_password2 : FormControl| any;
  

  constructor(
    public session: Session,
    private router:Router,
    private userModel:UserModel) {

      this.form = new FormGroup({
        old_password : new FormControl('', [
          Validators.required,
          Validators.min(5),
        ]),
        new_password1 : new FormControl('', [
          Validators.required,
          Validators.min(5),
        ]),
        new_password2 : new FormControl('', [
          Validators.required,
          Validators.min(5),
        ]),      
      }, MustMatch('new_password1', 'new_password2')); 

    }

  ngOnInit(): void {  
    this.session.isSearchShown = false; 
  }

  public change_pwd = (form:any) => {
    console.log(form);
    if(this.form.valid){     
      this.userModel.changePassword( this.session.getUser(), form.new_password1, this.session.getUser())
      .subscribe(res=>{
        if(res.isSuccess()){
          let user: User | any = res.getData();
          this.session.setUser(user);
        }
        this.errorMessage = res.getMessage();
      })
    }
    
  }

  public onCancel = () => {
    this.router.navigateByUrl('/');
  }

  hasError(controlName: string, errorName: string){
    return this.form.controls[controlName].hasError(errorName);
  }
}
