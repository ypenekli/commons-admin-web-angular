import { DataEntity } from "./entity.model";

export class Reference<T> extends DataEntity{

    private static KEY:string = "key";
    private static VALUE:string = "value";
    private static descriptionFieldName="description";

    private keyFieldName:string;
    private valueFieldName:string;
    private toStringFieldName:string;

    constructor(
        key:T,
        value:string,
        keyFieldName?:string, 
        valueFieldName?:string){
        super();
        this.toStringFieldName = "";
        this.keyFieldName = keyFieldName ? keyFieldName:Reference.KEY;
        this.valueFieldName = valueFieldName ? valueFieldName:Reference.VALUE;
        this.set(this.keyFieldName, key, false);
        this.set(this.valueFieldName, value, false);
        
    }
    
    public newInstance(payload:Partial<any>):Reference<T>{
        return DataEntity.fromPlain(payload, new Reference(this.key, this.value, this.keyFieldName, this.valueFieldName));
    }

    get key():T{
        return this.get(this.keyFieldName);
    }
    set key(value:T){
        this.set(this.keyFieldName, value, false);
    }

    get value():string{
        return this.get(this.valueFieldName);
    }
    set value(value:string){
        this.set(this.valueFieldName, value, false);
    }

    get description():string{
        return this.get(Reference.descriptionFieldName);
    }
    set description(value:string){
        this.set(Reference.descriptionFieldName, value, false);
    }

    public get schemaName(): string {
        return "";
    }
    public get tableName(): string {
        return"";
    }
    
}