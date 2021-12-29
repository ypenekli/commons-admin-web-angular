import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { AppVersion } from "../entities/app-version.model";
import { User } from "../entities/user.model";

@Injectable()
export class AppVersionModel implements OnInit {
    static className() {
        return "AppVersionModel";
    }

    private appVersions: AppVersion[] = [];
    private appVersionKeys: AppVersion[] = [];
    public result: Result<AppVersion>;



    constructor(private restService: RestService<AppVersion>) {
        this.result = new Result(false, '', new AppVersion("0.4", 100, 0), 0);
    }

    ngOnInit(): void { }

    getAppVersionKeys(): AppVersion[] {
        return this.appVersionKeys;
    }
    getAppVersions(): AppVersion[] {
        return this.appVersions;
    }

    findAppVersionKeys(pAppId: string): Observable<boolean> {
        this.appVersions = [];
        this.appVersionKeys = [];
        let appId: FnParam = new FnParam("appid", pAppId);
        let fnName: string = "findAppVersionKeys";
        return this.restService.getAny(AppVersionModel.className(), fnName, '-', (new AppVersion()).getClassName(), appId)
            .pipe(map(appVersionKeys => {
                this.appVersionKeys = new Array();
                if (appVersionKeys != null) {
                    this.appVersionKeys = appVersionKeys.map(partial => AppVersion.fromPlain(partial));
                   // this.addNewVersion(pAppId);
                }
                return true;
            }));
    }

    findAppVersions(pAppId: string, pVersion: number): Observable<boolean> {
        let appId: FnParam = new FnParam("appid", pAppId);
        let version: FnParam = new FnParam("version", pVersion);
        let fnName: string = "findAppVersions";
        return this.restService.getAny(AppVersionModel.className(), fnName, '-', (new AppVersion()).getClassName(), appId, version, version)
            .pipe(map(appVersions => {
                this.appVersions = new Array();
                if (appVersions != null) {
                    this.appVersions = appVersions.map(partial => AppVersion.fromPlain(partial));
                }
                return true;
            }));
    }

    addNewVersion(pAppId: string, pIncrementVersionNumber:boolean) : AppVersion{
        let aNew: AppVersion;
        if(pIncrementVersionNumber){
            let k = this.generateKey();
            aNew = new AppVersion(pAppId, k.version, -1);
            aNew.label = k.label;

        }else{            
            if (this.appVersionKeys != null && this.appVersionKeys.length > 0) {
                let v: AppVersion = this.appVersionKeys[0];
                aNew = new AppVersion(pAppId, v.version, this.appVersions.length + 1);
                aNew.label = v.label;
                aNew.publishDate = v.publishDate;
            }else{
                aNew = new AppVersion(pAppId, 100, 0);  
                aNew.label = '1.0.0';
            }
        }
        //this.appVersionKeys.unshift(aNew);
        return aNew;
    }

    generateKey() {
        let k:number = 100;       
        if (this.appVersionKeys != null && this.appVersionKeys.length > 0) {
            let v: AppVersion = this.appVersionKeys[0];
            k = v.version;
        }
        k = ++k;
        let l1: string = k.toString();
        let l2: string = l1[0] + '.' + l1[1] + '.' + l1[2];       
        return { 'version': k, 'label': l2 };
    }

    saveVersion(appVersion: AppVersion, user: User): Observable<string> {
        //this.result = null;
        appVersion = RestService.setLastUserInfo(appVersion, user.email);
        let isNew: boolean = appVersion.isNew();

        return this.restService.post(AppVersionModel.className(), "saveVersion",
            new FnParam("app_version", appVersion),
            new FnParam("user", user))
            .pipe(map(res => {
                this.result = Result.fromPlain(res, new AppVersion());
                if (this.result.isSuccess()) {
                    let a = this.result.getData();
                    if (a) {
                        appVersion.version = a.version;
                        appVersion.accept();
                    }
                    if (isNew) {
                        this.appVersions.push(appVersion);
                    }
                }
                return this.result.getMessage();
            }));

    }
}