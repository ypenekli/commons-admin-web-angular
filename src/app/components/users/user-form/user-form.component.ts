import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/model/base-form';
import { Common } from 'src/app/model/entities/common.model';
import { User } from 'src/app/model/entities/user.model';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { UserModel } from 'src/app/model/repositories/user.repository';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseForm implements OnInit {    
  user: User = new User();
  cities:Common[] = [];
  titles:Common[] = [];
  professions:Common[] = [];
  
  constructor(    
    private session: Session,
    private aRoute: ActivatedRoute,
    private repository: UserModel,
    private commonModel:CommonModel,
    private router:Router,
    private snackBar:MatSnackBar) {
      super(aRoute);   
      let id:number = -1;         
      if( this.mode == 1){       
        id = +aRoute.snapshot.params['id'];   
      } 
      this.user = repository.getUser(id); 
    }

  ngOnInit(): void {
    this.messages = '';
    this.commonModel.findByParent(CommonModel.PARENT_ID_CITY_TR)
    .subscribe(res=>{
      this.cities = this.commonModel.getCommons();
    });

    this.fieldsToValidate = new Map([
      ["name", $localize`:FieldName@@field_name:name`],
      ["surname", $localize`:FieldName@@field_surname:surname`]
    ]); 
  }  
  
  save(form: NgForm) {       
    if(form.valid){    
      this.repository.save(this.user, this.session.getUser().email)
      .subscribe(message=>{
        this.messages = message;
        this.snackBar.open(message, $localize`:@@save:Save`, {
          duration: 2000,
        });
      });    
    }
  }

  formSubmitted:boolean=false;
  submitForm(form:NgForm){
    this.formSubmitted = true;
    if(form.valid){
      console.log("saved");
      form.reset();
      this.formSubmitted = false;
    }
  }
  
  public onCancel = () => {
    this.user.reject();
    this.router.navigateByUrl('/users');
  }
}
