import { ActivatedRoute } from "@angular/router";
import { Session } from "./session.model";

export class BaseForm {
    protected mode: number =  0;
    constructor(
        protected activeRoute?: ActivatedRoute){     
            if(activeRoute != null){
                let edit:number = activeRoute.snapshot.params['mode'];
                if(edit != null && edit > -1){
                    this.mode = edit;
            }
        }
    }
    get modeLabel():string{
        return Session.FORM_MODE[this.mode].value;
    }
    
    protected fieldsToValidate:Map<string, string> = new Map([
        ["name", $localize`:FieldName@@field_name:name`],
        ["surname", $localize`:FieldName@@field_surname:surname`]
    ]); 

    public hasErrors(control:any){
        //!name.valid && name.touched
        //control.errors
        return control.touched && !control.valid;
    } 

    public getErrors(control:any){
        let messages:string[] = [];
        let fieldName = this.fieldsToValidate.get(control.name);
        if(control.errors){
            for(let errorName in control.errors){
            switch(errorName){
                case "required":
                messages.push($localize`:Error@@error_required:You must enter a ${fieldName}`);
                break;
                case "minlength":
                let minlength :number = control.errors.minlength.requiredLength 
                messages.push($localize`:Error@@error_min:Min. ${minlength} characters for ${fieldName}`);
                break;
                case "maxlength":
                let maxlength:number = control.errors.maxlength.requiredLength;
                messages.push($localize`:Error@@error_max:Max. ${maxlength} characters for ${fieldName}`);
                break;
                case "pattern":           
                messages.push($localize`:Error@@error_patern:${fieldName} contains illegal characters`);
                break;
                }
            }
        }
    return messages;
    }
}