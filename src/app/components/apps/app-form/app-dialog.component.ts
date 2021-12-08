import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseForm } from "src/app/model/base-form";
import { AppFunc } from "src/app/model/entities/app-func.model";
import { App } from "src/app/model/entities/app.model";
import { AppFuncModel } from "src/app/model/repositories/app-func.repository";
import { AppModel } from "src/app/model/repositories/app.repository";
import { Session } from "src/app/model/session.model";
import { Reference } from "src/service/reference.model";


@Component({
    selector: 'app-app-dialog',
    templateUrl: './app-dialog.component.html',
    styleUrls: ['./app-form.component.css']
})
export class AppDialogComponent extends BaseForm implements OnInit {

    appFunc: AppFunc;

    constructor(
        private session: Session,
        private aRoute: ActivatedRoute,
        private appFuncRepository: AppFuncModel,
        private snackBar: MatSnackBar,

        public dialogRef: MatDialogRef<AppDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        super(aRoute);
        this.appFunc = data.appFunc;
    }

    ngOnInit(): void {
        this.fieldsToValidate = new Map([
            ["app_name", $localize`:FieldName@@field_app_name:application name`],
            ["description", $localize`:FieldName@@field_description:description`],
            ["func_name", $localize`:FieldName@@field_func_name:function name`],
        ]);
    }

    get modeLabel(): string {
        return Session.FORM_MODE[this.mode].value;
    }

    get appTargets(): Reference<string>[] {
        return AppModel.targets;
    }

    get funcTargets(): Reference<string>[] {
        return AppFuncModel.targets;
    }

    get appFuncs(): AppFunc[] {
        return this.appFuncRepository.getAppFuncs();
    }

    saveFunc(form: NgForm) {
        if (form.valid) {
            this.appFuncRepository.saveFunc(this.appFunc, 1, this.session.getUser())
                .subscribe(message => {
                    //this.onGoUp();
                    this.snackBar.open(message, $localize`:@@save:Save`, {
                        duration: 2000,
                    });
                });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}