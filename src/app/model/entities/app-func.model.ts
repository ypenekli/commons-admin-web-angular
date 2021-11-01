import { DataEntity } from 'src/service/entity.model';
import { ITreeItem } from '../tree/tree-item-node';

export class AppFunc extends DataEntity implements ITreeItem<string>{
    private static schema_name:string='COMMON';
    private static table_name:string='APP_FUNCS';    
    
    constructor(id?:string){
        super();
        this.setPrimaryKeys('id');
        this.className = "AppFunc";
        if(id){
            this.set("id", id);
        }
    }
    
    public  get schemaName(): string {
        return AppFunc.schema_name;
    } 
    public  get tableName(): string {
        return AppFunc.table_name;
    } 

    public get id():string{
        return this.get('id');
    }
    public set id(value:string){
        this.set('id', value);
    } 

    public get description():string{
        return this.get('description');
    }
    public set description(value:string){
        this.set('description', value);
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

    public get isLeaf():boolean{
        return "T" == this.get('leaf');
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

    public get parentId():string{
        return this.get('parent_id');
    }
    public set parentId(value:string){
        this.set('parent_id', value);
    }

    public get appId():string{
        return this.get('app_id');
    }
    public set appId(value:string){
        this.set('app_id', value);
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

    //**** */

    

    public get value(){
        return this.get('id');
    }
    public get parentValue(){
        return this.get('parent_id');
    }
 
    public get parentName():string{
        return this.get('parent_name');
    }
    public set parentName(value:string){
        this.set('parent_name', value, false);
    }
    
    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new AppFunc());
    }
    
    addSubItem(subItemSize:number, isLeaf:boolean):AppFunc{
        let idx:number = 1;
        if(subItemSize != null && subItemSize > 0){
            idx = subItemSize + 1;
        }
        let newItem:AppFunc = new AppFunc(`${this.id}.${idx}`);
        newItem.parentId = this.id;
        newItem.parentName = this.name;
        newItem.appId=this.appId;
        newItem.level = this.level + 1;
        newItem.idx = idx;
        newItem.target = this.target;
        newItem.hierarchy = `${this.hierarchy}.${idx}`;
        this.leaf = false;
        return newItem;
    }
}