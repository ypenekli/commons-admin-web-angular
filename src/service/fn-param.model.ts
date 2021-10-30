import { DataEntity } from "./entity.model";

export class FnParam{
    constructor(public name:string, public value:Object){}

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
  }