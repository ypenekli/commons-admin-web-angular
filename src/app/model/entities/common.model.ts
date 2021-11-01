import { DataEntity } from 'src/service/entity.model';

export class Common extends DataEntity{
    private static schema_name:string='COMMON';
    private static table_name:string='COMMONS';    
    
    constructor(id?:number){
        super();
        this.setPrimaryKeys('id');
        this.className = "Common";
        if(id){
            this.set("id", id);
        }
    }
    
    public  get schemaName(): string {
        return Common.schema_name;
    } 
    public  get tableName(): string {
        return Common.table_name;
    } 

    public get id():number{
        return this.get('id');
    }
    public set id(value:number){
        this.set('id', value);
    } 
    public get description():string{
        return this.get('description');
    }
    public set description(value:string){
        this.set('description', value);
    }
    public get groupCode():number{
        return this.get('group_code');
    }
    public set groupCode(value:number){
        this.set('group_code', value);
    }

    public get hierarchy():string{
        return this.get('hierarchy');
    }
    public set hierarchy(value:string){
        this.set('hierarchy', value);
    }

    public get iconUrl():string{
        return this.get('icon_url');
    }
    public set iconUrl(value:string){
        this.set('icon_url', value);
    }

    public get idx():number{
        return this.get('idx');
    }
    public set idx(value:number){
        this.set('idx', value);
    }

    public get leaf():boolean{
        return "T" == this.get('leaf');
    }
    public set leaf(value:boolean){
        this.set('leaf', value?"T":"F");
    }

    public get level():number{
        return this.get('level');
    }
    public set level(value:number){
        this.set('level', value);
    }

    public get name():string{
        return this.get('name');
    }
    public set name(value:string){
        this.set('name', value);
    }
    public get abrv():string{
        return this.get('abrv');
    }
    public set abrv(value:string){
        this.set('abrv', value);
    }

    public get parentId():string{
        return this.get('parent_id');
    }
    public set parentId(value:string){
        this.set('parent_id', value);
    }

    public get status():string{
        return this.get('status');
    }
    public set status(value:string){
        this.set('status', value);
    }
   
    
    public get parentName():string{
        return this.get('parent_name');
    }

    public get p2Id():string{
        return this.get('p2_id');
    }
    
    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new Common());
    }
}