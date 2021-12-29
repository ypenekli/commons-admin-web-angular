import { DataEntity } from 'src/service/entity.model';

export class AppVersion extends DataEntity{
    private static schema_name:string='COMMON';
    private static table_name:string='APP_VERSIONS'; 
    
    constructor(appId?:string, version?:number, idx?:number){
        super();
        this.setPrimaryKeys('app_id', 'version', 'idx');
        this.className = "AppVersion";
        if(appId){
            this.set("app_id", appId);
            this.set("version", version);
            this.set("idx", idx);
        }
    }
    
    public newInstance(payload:Partial<any>):AppVersion{
        return DataEntity.fromPlain(payload, new AppVersion());
    }
    
    public  get schemaName(): string {
        return AppVersion.schema_name;
    } 
    public  get tableName(): string {
        return AppVersion.table_name;
    } 

    public get appId():string{
        return this.get('app_id');
    }
    public set appId(value:string){
        this.set('app_id', value);
    }

    public get version():number{
        return this.get('version');
    }
    public set version(value:number){
        this.set('version', value);
    }

    public get idx():number{
        return this.get('idx');
    }
    public set idx(value:number){
        this.set('idx', value);
    }

    public get label():string{
        return this.get('label');
    }
    public set label(value:string){
        this.set('label', value);
    }

    public get appFuncId():string{
        return this.get('app_func_id');
    }
    public set appFuncId(value:string){
        this.set('app_func_id', value);
    }

    public get description():string{
        return this.get('description');
    }
    public set description(value:string){
        this.set('description', value);
    }

    private mPublishDate?:Date | null;
    public get publishDate():Date | null{
        if(this.mPublishDate== null){    
            this.mPublishDate = this.getDate('publish_date'); 
        }        
        return this.mPublishDate;
    }
    public set publishDate(value:Date | null){ 
        this.mPublishDate = value;      
        this.setDate('publish_date', value, true);
    }

    public toString = () : string => {
        //{{appVers.label + ' : ' + (appVers.publishDate | date :'shortDate')}}
        return this.label + ' : ' + (this.publishDate?.toLocaleDateString('tr') )
    }

    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new AppVersion());
    }
}