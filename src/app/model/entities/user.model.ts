import { DataEntity } from 'src/service/entity.model';

export class User extends DataEntity{
    private static schema_name:string='COMMON';
    private static table_name:string='USERS'; 
    
    constructor(id?:number){
        super();
        this.setPrimaryKeys('id');
        this.className = "User";
        if(id){
            this.set("id", id);
        }
    }
    
    public newInstance(payload:Partial<any>):User{
        return DataEntity.fromPlain(payload, new User());
    }
    
    public  get schemaName(): string {
        return User.schema_name;
    } 
    public  get tableName(): string {
        return User.table_name;
    } 

    public get id():number{
        return this.get('id');
    }
    public set id(value:number){
        this.set('id', value);
    }

    public get name():string{
        return this.get('name');
    }
    public set name(value:string){
        this.set('name', value);
    }

    public get surname():string{
        return this.get('surname');
    }
    public set surname(value:string){
        this.set('surname', value);
    }

    public get email():string{
        return this.get('email');
    }
    public set email(value:string){
        this.set('email', value);
    }

    private imUrl:string = "1.jpg";
    public get imageUrl(){
        return this.imUrl;
    }
    public set imageUrl(value:string){
        this.imUrl = value;
    }
    private mBirthDate?:Date | null;
    public get birthDate():Date | null{
        if(this.mBirthDate== null){    
            this.mBirthDate = this.getDate('birth_date'); 
        }        
        return this.mBirthDate;
    }
    public set birthDate(value:Date | null){ 
        this.mBirthDate = value;      
        this.setDate('birth_date', value, true);
    }

    public get birthCity():number{
        return this.get('birth_city');
    }
    public set birthCity(value:number){
        this.set('birth_city', value);
    }

    public get homeCity():number{
        return this.get('home_city');
    }
    public set homeCity(value:number){
        this.set('home_city', value);
    }

    public get homeAddress():string{
        return this.get('home_address');
    }
    public set homeAddress(value:string){
        this.set('home_address', value);
    }

    public get mobilePhoneNu():string{
        return this.get('phone_nu2');
    }
    public set mobilePhoneNu(value:string){
        this.set('phone_nu2', value);
    }
    
    public get fullname(){
        return `${this.name} ${this.surname}`;
    }
    static fromPlain(payload:Partial<DataEntity>){ 
        return DataEntity.fromPlain(payload, new User());
    }
}