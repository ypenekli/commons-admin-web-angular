import { DataEntity } from "./entity.model";

export class FnParam{
    constructor(public name:string, public value:Object){}

    
    static replacer(key, value) {        
      if(value instanceof Map) {
          let jsonObj={};
          value.forEach((v, k)=>{
              jsonObj[k]=v;
          });
         return jsonObj;
      } else {
         return value;
      }
    }
  }