import { DataEntity } from 'src/service/entity.model';

export class App extends DataEntity{
    private static schema_name:string='COMMON';
    private static table_name:string='APPS';    
    
    constructor(id?:string){
        super();
        this.setPrimaryKeys('id');
        this.className = "App";
        if(id){
            this.set("id", id);
        }
    }
    
    public  get schemaName(): string {
        return App.schema_name;
    } 
    public  get tableName(): string {
        return App.table_name;
    } 

    public get id():string{
        return this.get('id');
    }
    public set id(value:string){
        this.set('id', value);
    } 

    public get author():string{
        return this.get('author');
    }
    public set author(value:string){
        this.set('author', value);
    }

    public get description():string{
        return this.get('description');
    }
    public set description(value:string){
        this.set('description', value);
    }

    public get iconUrl():string{
        return this.get('icon_url');
    }
    public set iconUrl(value:string){
        this.set('icon_url', value);
    }

    public get name():string{
        return this.get('name');
    }
    public set name(value:string){
        this.set('name', value);
    }

    public get organization():string{
        return this.get('organization');
    }
    public set organization(value:string){
        this.set('organization', value);
    }

    public get status():string{
        return this.get('status');
    }
    public set status(value:string){
        this.set('status', value);
    }

    public get target():string{
        return this.get('target');
    }
    public set target(value:string){
        this.set('target', value);
    }

    public get url():string{
        return this.get('url');
    }
    public set url(value:string){
        this.set('url', value);
    }

    public get version():string{
        return this.get('version');
    }
    public set version(value:string){
        this.set('version', value);
    }
    
    public get versionUpdateDate():number{
        return this.get('version_update_date');
    }
    public set versionUpdateDate(value:number){
        this.set('version_update_date', value);
    }
        
    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new App());
    }

    //**** */
    public get groupId():number{
        return this.get("group_id");
    }
}