import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/model/base-form';
import { AppFunc } from 'src/app/model/entities/app-func.model';
import { AppVersion } from 'src/app/model/entities/app-version.model';
import { App } from 'src/app/model/entities/app.model';
import { AppFuncModel } from 'src/app/model/repositories/app-func.repository';
import { AppVersionModel } from 'src/app/model/repositories/app-versions.repository';
import { AppModel } from 'src/app/model/repositories/app.repository';
import { Session } from 'src/app/model/session.model';
import { Reference } from 'src/service/reference.model';
import { FuncDialogComponent } from './func-dialog.component';
import { VersionDialogComponent } from './version-dialog.component';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent extends BaseForm implements OnInit {
  id: string = '-1';
  version: number;
  addNewVersion: boolean = false;
  app: App;
  appFunc: AppFunc | any;
  private appNode: AppFunc[] = [];

  funcDisplayedColumns: string[] = ['abrv', 'name', 'id'];
  versionDisplayedColumns: string[] = ['label', 'description'];

  constructor(
    private session: Session,
    private aRoute: ActivatedRoute,
    private repository: AppModel,
    private appFuncRepository: AppFuncModel,
    private appVersionRepository: AppVersionModel,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(aRoute);
    this.id = aRoute.snapshot.params['id'];
    this.app = new App();
    this.version = -1;
  }

  ngOnInit(): void {
    this.getApp();
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

  get appVersionKeys(): AppVersion[] {
    return this.appVersionRepository.getAppVersionKeys();
  }

  get appVersions(): AppVersion[] {
    return this.appVersionRepository.getAppVersions();
  }

  openFuncDialog(subApppFunc: AppFunc): void {
    const dialogRef = this.dialog.open(FuncDialogComponent,
      {
        width: '400px',
        panelClass: 'dialog-container-custom',
        data: { subApppFunc: subApppFunc },
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.appFunc = result;
    });
  }

  openVersionDialog(appVersion?: AppVersion): void {
    if (appVersion == null) {
      appVersion = this.appVersionRepository.addNewVersion(this.id, this.addNewVersion);
    }
    let versions = this.appVersionRepository.getAppVersionKeys();
    if (versions != null && versions.length > 0) {
      let v: AppVersion = versions[0];
      if (appVersion.version < v.version) {
        appVersion.delete();
      }
    }

    const dialogRef = this.dialog.open(VersionDialogComponent,
      {
        width: '400px',
        panelClass: 'dialog-container-custom',
        data: { appVersion: appVersion },
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.appFunc = result;
    });
  }

  saveApp(form: NgForm) {
    if (form.valid) {
      this.repository.saveApp(this.app, this.session.getUser())
        .subscribe(message => {
          this.snackBar.open(message, $localize`:@@save:Save`, {
            duration: 2000,
          });
        });
    }
  }

  saveFunc(form: NgForm) {
    if (form.valid) {
      this.appFuncRepository.saveFunc(this.appFunc, this.app.groupId, this.session.getUser())
        .subscribe(message => {
          this.onGoUp();
          this.snackBar.open(message, $localize`:@@save:Save`, {
            duration: 2000,
          });
        });
    }
  }

  getApp() {
    let app = this.repository.getApp(this.id);
    if (app != null) {
      if (app.isNew()) {
        app.author = this.session.getUser().fullname;
      }
      this.app = app;
      this.appFunc = new AppFunc(app.id);
      this.appFunc.appId = app.id;
      this.appFunc.parentId = app.id;
      this.appFunc.name = app.name;
      this.appFunc.url = app.url;
      this.appFunc.level = 1;
      this.appFunc.accept();
      this.sellectAppFunc(this.appFunc);

      this.appVersionRepository.findAppVersionKeys(this.id)
        .subscribe(res => { });

    }
  }
  sellectAppFunc(appFunc: AppFunc) {
    this.appNode.push(this.appFunc);
    this.appFunc = appFunc;
    if (!appFunc.isNew()) {
      this.appFuncRepository.findAppFuncs(this.appFunc.id)
        .subscribe(res => { });
    };
  }
  onGoUp() {
    if (this.appNode.length > 1) {
      this.appFunc = this.appNode.pop();
      this.appFuncRepository.findAppFuncs(this.appFunc.id)
        .subscribe(res => { });
    }
  }
  get disableGouUp(): boolean {
    return this.appNode.length < 2;
  }

  onAddFunc() {
    if (this.appFunc != null) {
      this.sellectAppFunc(this.appFunc.addSubItem(this.appFuncs.length, true));
    }
  }
  onVersionSellect() {
    console.log("selection :" + this.version)
    this.appVersionRepository.getAppVersionKeys()
    this.appVersionRepository.findAppVersions(this.id, this.version)
      .subscribe(res => { });
  }
  get disableAddFunc(): boolean {
    return this.appFunc.isNew();
  }

  public onAppCancel = () => {
    this.app.reject();
    this.router.navigateByUrl('/apps');
  }

  public onFuncCancel = () => {
    this.appFunc.reject();
    this.onGoUp();
  }
}
