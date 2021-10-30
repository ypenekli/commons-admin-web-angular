import { User } from 'src/app/model/entities/user.model';
import { DataEntity } from './entity.model';
import { Pager } from './pager.model';

export class Result<T>{
    constructor(
        private success: boolean = false,                    
        private message?:string,        
        private data?: T, 
        private errorCode?:number
    ) {}
    
    isSuccess(){
        return this.success;
    }
    setSuccess(success:boolean){
        this.success = success;
    }
    getMessage():string{
        return this.message;
    }
    setMessage(message:string){
        this.message = message;
    }
    getData():T{
        return this.data;
    }
    setData(data:T){
        this.data = data;
    }
    getErrorCode():number{
        return this.errorCode;
    }
    setErrorCode(errorCode:number){
        this.errorCode = errorCode;
    }   

   static fromPlain(payload:Partial<any>, target):Result<any>{
        let result = new Result(payload['success'], payload['message']);
        result.data = DataEntity.fromPlain(payload['data'], target);
        result.errorCode = payload['errorCode'];    
        return result;       
    }
}