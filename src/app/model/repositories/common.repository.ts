import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "src/service/rest.service";
import { FnParam } from "src/service/fn-param.model";
import { Result } from "src/service/result.model";
import { Common } from "../entities/common.model";
import { User } from "../entities/user.model";
import { Pager } from "src/service/pager.model";

@Injectable()
export class CommonModel implements OnInit {


    static className() {
        return "CommonModel";
    }

    public static PARENT_ID_CITY_TR: number = 1020000000;
    public static PARENT_ID_PROFESSION: number = 1030000000;
    public static PARENT_ID_TITLE: number = 1040000000;
    public static PARENT_ID_POSITION: number = 1050000000;

    private commons: Common[] = [];
    public result: Result<Common>;

    constructor(private restService: RestService<Common>) {
        this.result = new Result(false, '', new Common(-1), 0);
    }

    ngOnInit(): void { }

    public getCommons(): Common[] {
        return this.commons;
    }

    getCommon(id: number): Common {
        if (id != null && id > -1) {
            let c = this.commons.find(p => p.id == id);
            if (c) {
                return c;
            }
        }
        return new Common(-1);
    }

    findByParent(pParentId: number, pPager: Pager | null): Observable<Pager> {
        let parentId: FnParam = new FnParam("parent_id", pParentId);
        let fnName: string = "findByParent";
        let common = new Common();
        let pager: Pager;
        if (pPager) {
            pager = pPager;
        } else {
            pager = new Pager();
        }
        return this.restService.getPageAny(CommonModel.className(), fnName, '-', common.getClassName(), pager, parentId)
            .pipe(map(res => {
                let result = Result.fromPlain(res, common);
                this.commons = new Array();
                if (result != null) {
                    this.commons = result.getData();
                    let count: number = result.getDataLength();
                    if (count > 0) {
                        pager.setLength(result.getDataLength());
                    }
                }
                return pager;
            }));
    }

    findByName(pParentId: number, pName:string, pPager: Pager | null): Observable<Pager> {
        if (!!pName) {
            pName = "%" + pName + "%";
        } else pName = "";
        let name: FnParam = new FnParam("name", pName);
        let parentId: FnParam = new FnParam("parent_id", pParentId);
        let fnName: string = "findByName";
        let common = new Common();
        let pager: Pager;
        if (pPager) {
            pager = pPager;
        } else {
            pager = new Pager();
        }

        return this.restService.getPageAny(CommonModel.className(), fnName, '-', common.getClassName(), pager, parentId, name)
            .pipe(map(res => {
                let result = Result.fromPlain(res, common);
                this.commons = new Array();
                if (result != null) {
                    this.commons = result.getData();
                    let count: number = result.getDataLength();
                    if (count > 0) {
                        pager.setLength(result.getDataLength());
                    }
                }
                return pager;
            }));
    }

    saveCommon(common: Common, user: User): Observable<string> {
        //this.result = new Result();
        console.log("common :" + common.get("abrv"));
        common = RestService.setLastUserInfo(common, user.email);
        let isNew: boolean = common.isNew();
        return this.restService.post(CommonModel.className(), "saveCommon",
            new FnParam("common", common),
            new FnParam("user", user))
            .pipe(map(res => {
                this.result = Result.fromPlain(res, new Common());
                if (this.result.isSuccess()) {
                    let v = this.result.getData();
                    if (v) {
                        common.id = v.id;
                        common.accept();
                    }
                    if (isNew) {
                        this.commons.push(common);
                    }
                }
                return this.result.getMessage();
            }));

    }

    getSaveResult(): Result<Common> {
        return this.result;
    }
}