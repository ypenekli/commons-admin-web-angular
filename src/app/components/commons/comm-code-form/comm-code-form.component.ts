import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/model/base-form';
import { Common } from 'src/app/model/entities/common.model';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { Session } from 'src/app/model/session.model';
import { Result } from 'src/service/result.model';

@Component({
  selector: 'app-comm-code-form',
  templateUrl: './comm-code-form.component.html',
  styleUrls: ['./comm-code-form.component.css']
})
export class CommCodeFormComponent extends BaseForm implements OnInit {   
  id:number = -1;
  common: Common = new Common(-1);   

  constructor(
    private session: Session,
    private aRoute: ActivatedRoute,
    private repository: CommonModel,
    private router:Router,
    private snackBar:MatSnackBar) {
      super(aRoute);        
      this.id = aRoute.snapshot.params['id'];  
    }

  ngOnInit(): void {
    this.messages = '';
    this.common = this.repository.getCommon(this.id) ;
    this.fieldsToValidate = new Map([
      ["name", $localize`:FieldName@@field_name:name`],
      ["short_name", $localize`:FieldName@@field_short_name:short name`],
      ["description", $localize`:FieldName@@field_description:description`],
    ]);     
  }
  get modeLabel():string{
    return Session.FORM_MODE[this.mode].value;
  }

  save(form: NgForm) {         
    if(form.valid){    
      this.repository.saveCommon(this.common, this.session.getUser())
      .subscribe(message=>{
        this.messages = message;
        this.snackBar.open(message, $localize`:@@save:`, {
          duration: 2000,
        });
      });    
    }
  }
}