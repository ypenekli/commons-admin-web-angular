import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { BaseForm } from "src/app/model/base-form";
import { AppFunc } from "src/app/model/entities/app-func.model";
import { AppVersion } from "src/app/model/entities/app-version.model";
import { AppFuncModel } from "src/app/model/repositories/app-func.repository";
import { AppVersionModel } from "src/app/model/repositories/app-versions.repository";
import { Session } from "src/app/model/session.model";


@Component({
    selector: 'app-func-dialog',
    templateUrl: './version-dialog.component.html',
    styleUrls: ['./app-form.component.css'],
    encapsulation: ViewEncapsulation.None 
})
export class VersionDialogComponent extends BaseForm implements OnInit {
   
    appVersion:AppVersion;

    constructor(
        private session: Session,
        private aRoute: ActivatedRoute,
        private appFuncRepository: AppFuncModel,
        private appVersionRepository: AppVersionModel,
        private snackBar: MatSnackBar,

        public dialogRef: MatDialogRef<VersionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        super(aRoute);
        this.appVersion = data.appVersion;        
    }

    ngOnInit(): void {       
        this.fieldsToValidate = new Map([
            ["version", $localize`:FieldName@@field_version:application version`],
            ["description", $localize`:FieldName@@field_description:description`],
            ["app_func_id", $localize`:FieldName@@field_app_func_id:app function name`],
            ["publish_date", $localize`:FieldName@@field_publish_date:publish date`],
        ]);
        if(this.appVersion.isDeleted()){
            this.mode = 3;
        }else if(this.appVersion.isNew()){
            this.mode = 0;
        }else{
            this.mode = 1;
        }
    }

    get modeLabel(): string {
        return Session.FORM_MODE[this.mode].value;
    }

    get appFuncs(): AppFunc[] {
        return this.appFuncRepository.getAppFuncs();
    }

    saveVersion(form: NgForm) {
        if (form.valid) {
            this.appVersionRepository.saveVersion(this.appVersion, this.session.getUser())
                .subscribe(message => {
                    this.snackBar.open(message, $localize`:@@save:Save`, {
                        duration: 2000,
                    });
                });
        }
    }

    onCancel(): void {
        this.appVersion.reject();
        this.dialogRef.close();
    }
}