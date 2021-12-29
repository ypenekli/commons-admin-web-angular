import { formatDate, NgClass, Time } from "@angular/common";

export class Element{

    private typeName:string;
    private readOnly:boolean;
    private _value:any;

    constructor(
        private value?:any,
        private changed:boolean = false){
            if(this.value){
                this.typeName = typeof(this.value);
            }else this.typeName = 'string';
           
            this.readOnly = false;
    }

    public getValue():any{
        return this.value;
    }
    private setTypeName(){
        if(this.value){
            this.typeName = typeof(this.value);
        }else this.typeName = 'string';
    }
    public setValue(pValue:any, pChanged:boolean=true){
        if(!this.changed && pChanged){
            this._value = this.value;
        }
        this.value = pValue;
        this.changed = pChanged;
        this.setTypeName();
    }

    public isChanged(){
        return this.changed;
    }
    public isReadOnly(){
        return this.readOnly;
    }
    public setReadOnly(readOnly:boolean){
        this.readOnly = readOnly;
    }
    public getTypeName(){
        return this.typeName;
    }
    public accept() {
        this.changed = false;
        this._value = null;
    }
    public reject() {
        if(this.changed){
            this.changed = false;  
            this.value = this._value;      
            this._value = null;
        }       
    }    
    static fromPlain(element:Partial<any>):Element{   
        let e : Element = new Element(element['value'], element['changed']);
        e.setReadOnly(element['readOnly']);
        return e;
    }
}

export abstract class DataEntity{ 
    static  INSERTED:number = 0;
    static  DELETED:number=1;
    static  UPDATED:number=2;
    static  UNCHANGED:number=3;
    static  EMPTY:number=4;

    protected className:string = "DataEntity";
    private state:number = DataEntity.INSERTED;    
    private fields:Map<string, Element> = new Map<string, Element>();
    private primaryKeys:Map<string, Element> = new Map<string, Element>();   
    
    
    constructor(payload?:Partial<any>){
        if(payload != null){          
            this.className = payload['className'] ;
            this.state = payload['state'];
            let elements  = payload['primaryKeys'];
            if(elements){
                for(const key in elements){
                    let v  = elements[key];
                    if(v){ 
                        this.primaryKeys.set(key, v);  
                    }                
                }
            }
            elements  = payload['fields'];
            if(elements){
                for(const key in elements){
                    let v  = elements[key];
                    if(v){ 
                        this.fields.set(key, v);  
                    } 
                }
            }  
        }
    }
    
    public abstract newInstance(payload:Partial<any>):DataEntity
    public abstract  get schemaName(): string ;
    public abstract  get tableName(): string;   
    
    public  getClassName():string{
        return this.className;
    }

    public get(fieldName:string):any{
        fieldName = fieldName.toLowerCase();
        if(this.fields && this.fields.has(fieldName)){
            let e = this.fields.get(fieldName);
            if(e){
                return e.getValue();
            }            
        }
        return null;
    }
    public isNull(fieldName:string):boolean{
        return !(this.fields && this.fields.has(fieldName));
    }
    public getElement(fieldName:string):Element | undefined{
        fieldName = fieldName.toLowerCase();
        return this.fields.get(fieldName);
    }
    public set(fieldName:string, pValue:any, pChanged:boolean = true){
        fieldName = fieldName.toLowerCase();
        var entry:any = this.fields.get(fieldName);
        if(entry != null){
           entry.setValue(pValue);
        }else entry = new Element(pValue, pChanged);

        this.fields.set(fieldName, entry);
        if(entry.isChanged && this.state === DataEntity.UNCHANGED){
            this.state = DataEntity.UPDATED;
        }
        if((this.isNew || !pChanged) && this.primaryKeys.has(fieldName)){
            this.primaryKeys.set(fieldName, entry);
        }
    }

    public getFields():Map<string, Element>{
        return this.fields;
    }
    public delete(){
        this.state = DataEntity.DELETED;
    }
    public accept(){
        this.state = DataEntity.UNCHANGED;
        this.fields.forEach((v,k)=>v.accept());
        this.primaryKeys.forEach((v,k)=>{
            let e = this.fields.get(k);
            if(e != null && e.getValue() != null){
                v.setValue(e.getValue());
            }
        });
    }
    public reject(){
        if(this.state != DataEntity.INSERTED){
            this.state = DataEntity.UNCHANGED;
            this.fields.forEach((v,k)=>v.reject());
        }
    }

    public isNew():boolean{
        return this.state == DataEntity.INSERTED;
    }
    public isUpdated():boolean {
        return this.state == DataEntity.UPDATED;
    }
    public isDeleted():boolean{
        return this.state == DataEntity.DELETED;
    }
    public isPrimaryKey(fieldName:string):boolean{
        fieldName = fieldName.toLowerCase();
        return this.primaryKeys.has(fieldName);
    }    

    public getPrimaryKeys():string[]{
        return Array.from(this.primaryKeys.keys());
    }
    public setPrimaryKeys(...keys:string[]){
        if(keys != null){
            keys.forEach(key=>{
               let e = this.getElement(key);
               if(e == null) {
                    e=new Element();
               }
                this.primaryKeys.set(key, e);
            });
        }
    }
    public getFieldNames():String[]{
        return Array.from(this.fields.keys());
    }

    public getPrimaryKeyValue(fieldName:string) {
        fieldName = fieldName.toLowerCase();
        var field:any= this.primaryKeys.get(fieldName);
        if(field){
            return field.getValue;
        }else return null;       
    }

    protected setDate(fieldName:string, value:Date | null, pChanged:boolean){ 
        if(value){
            this.set(fieldName, +formatDate(value, 'yyyyMMdd', "en-US") , pChanged);
        }else
            this.set(fieldName, value , pChanged);        
       
    }
    protected getDate(fieldName:string){        
        let value = this.get(fieldName);
        if(value != null && value.length > 7){
            return new Date(
                +value.substr(0, 4), 
                (+value.substr(4, 2))-1, 
                +value.substr(6, 2));
        } 
        return null;        
    }
    public setDateTime(fieldName:string, value:Date, pChanged:boolean){
        this.set(fieldName, +formatDate(value, 'yyyyMMddHHmmssSSS', "en-US") , pChanged);
    }
    protected getDateTime(fieldName:string){        
        let value = this.get(fieldName);
        if(value != null && value.length > 16){
            return new Date(
                +value.substr(0, 4), 
                (+value.substr(4, 2))-1, 
                +value.substr(6, 2),
                +value.substr(8, 2),
                +value.substr(10, 2),
                +value.substr(12, 2),
                +value.substr(14));
        } 
        return null;        
    }

    public jsonSerialize(){        
        return {
            'className':this.className,
            'state':this.state,
            'fields':JSON.stringify(Array.from(this.fields.entries())),
            'primaryKeys':JSON.stringify(Array.from(this.primaryKeys.entries()))
        };
    }
    
    static replacer(key:string, value:any) {  
        let k1 = key;      
        if(value instanceof Map) {
            let jsonObj:any={};
            value.forEach((v, k)=>{
                jsonObj[k]=v;
            });
           return jsonObj;
        } else {
           return value;
        }
      }
    
      static reviver(key:string, value:any){
          if(value && (key == 'primaryKeys' || key == 'fields')){
            let elements : Map<string, Element> = new Map();
            value.forEach((v:any, k:string)=>{
                elements.set(k, v);
            });
            return elements;
          }else return value;
      }

    static create<T>(type: (new () => T)): T {
        return new type();
    }

     static fromPlain(payload:Partial<any>, target:any){ 
        //static fromPlain<T>(payload:Partial<DataEntity>, type: { new(): T ;}){ 
        //let target:any = new type();  
        if(payload != null){ 
            target.className = payload['className'] ;
            target.state = payload['state'];
            let elements  = payload['primaryKeys'];
            if(elements){
                for(const key in elements){
                    let v = elements[key];
                    if(v){
                        target.primaryKeys.set(key, Element.fromPlain(v)); 
                    }
                }
            }
            elements  = payload['fields'];
            if(elements){
                for(const key in elements){
                    let v = elements[key];
                    if(v){
                        target.fields.set(key, Element.fromPlain(v)); 
                    }
                }
            }            
            target.accept();
        }
        return target;
    } 
}