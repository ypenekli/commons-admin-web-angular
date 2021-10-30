import { DataEntity } from 'src/service/entity.model';

export class Group extends DataEntity{
    private static schema_name:string='COMMON';
    private static table_name:string='GROUPS';    
    
    constructor(id?:number){
        super();
        this.setPrimaryKeys('id');
        this.className = Group.name;
        if(id){
            this.set("id", id);
        }
    }
    
    public  get schemaName(): string {
        return Group.schema_name;
    } 
    public  get tableName(): string {
        return Group.table_name;
    } 

    public get id():number{
        return this.get('id');
    }
    public set id(value:number){
        this.set('id', value);
    } 

    public get groupType():string{
        return this.get('group_type');
    }
    public set groupType(value:string){
        this.set('group_type', value);
    }

    public get hierarchy():string{
        return this.get('hierarchy');
    }
    public set hierarchy(value:string){
        this.set('hierarchy', value);
    }

    public get name():string{
        return this.get('name');
    }
    public set name(value:string){
        this.set('name', value);
    }

    public get status():string{
        return this.get('status');
    }
    public set status(value:string){
        this.set('status', value);
    }

    public get appId():string{
        return this.get('app_id');
    }
    public set appId(value:string){
        this.set('app_id', value);
    }
    
    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new Group());
    } 
}