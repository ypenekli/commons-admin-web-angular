import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataEntity } from './entity.model';
import { FnParam } from './fn-param.model';
import { Pager } from './pager.model';
import { Result } from './result.model';

@Injectable()
export class RestService<T> implements OnInit{

    static ipAddress:string;
    header:HttpHeaders;
    ipUrl:string = "http://api.ipify.org/?format=json";
    baseUrl: string = "http://localhost:81/commons-admin/service/";
    
    
  
    constructor(
      private http: HttpClient
    ) { 
      this.header =  new HttpHeaders({
        "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
        'Accept': 'application/json'
      });       
    }

    ngOnInit(): void { 
      if(RestService.ipAddress == null){
        this.getIPAddress();
      }
    }
    
    getHttpConnection(callerClassName:string, fnName:string, queryName?:string){
      let url = "";
      if(queryName != null){       
        url = `${this.baseUrl}${callerClassName}/${fnName}@${queryName}/`;
      }else{
        url = `${this.baseUrl}${callerClassName}/${fnName}/`;
      } 
      console.log("url :" + url);
      return url;      
    }    

    getClass(type: { new(): T ;}){
      return new type();
    }
    
    
    getAny(callerClassName:string, fnName:string, queryName:string, className:string, 
          pPager:Pager | null, ...pParams:FnParam[]):Observable<T[]>{
      const url :string = this.getHttpConnection(callerClassName, fnName, queryName); 
      if(pPager == null)  {
        pPager = new Pager();
      }
      let type:FnParam = new FnParam("type", className);
      let pager:FnParam = new FnParam("pager", pPager);
      if(pParams === null){
        pParams = [type, pager];
      }else{
        pParams.unshift(pager);
        pParams.unshift(type);

      };
      const params : HttpParams = new HttpParams()        
            .set('params', JSON.stringify(pParams)) ;
     
      return this.http.get<T[]>( url,  {
        headers:this.header,
        params:params})
        .pipe(
        catchError(this.handleError)
      );
    }

    post(callerClassName:string, fnName:string, ...params:FnParam[]):Observable<Result<string>>{
      const url :string = this.getHttpConnection(callerClassName, fnName); 
      const body:string = JSON.stringify(params, FnParam.replacer);           
      return this.http.post<Result<string>>( url, body,  {headers:this.header})
      .pipe(
        catchError(this.handleError)
      );
    } 

    postOne(callerClassName:string, fnName:string, data:DataEntity):Observable<Result<T>>{
      const url :string = this.getHttpConnection(callerClassName, fnName);  
      const body:string = JSON.stringify(data, DataEntity.replacer);             
      return this.http.post<Result<T>>( url, body,  {headers:this.header})
      .pipe(
        catchError(this.handleError)
      );
    }      
    
    findAll(callerClassName:string, fnName:string, className:string,  params:FnParam[]):Observable<string>{
      let url :string = this.getHttpConnection(callerClassName, 'findBy',  fnName);
      let param = JSON.stringify(params);      
      console.log("param :" + param)
      //return this.http.get(url, {headers:this.http},)
      return this.http.post<string>(url, param, 
        {headers: new HttpHeaders({
          "Content-Type": "application/json; charset=UTF-8",
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
          'X-Random-Shit':'123123123'
      })});
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }  
  
    getIPAddress()
    {
      this.http.get(this.ipUrl)
      .subscribe((res:any)=>{
        RestService.ipAddress = res.ip;        
      });
    }

    static setLastUserInfo(data:any, user:string){
      var now:Date = new Date();
      var remadres:string =  window.location.origin ;//RestService.ipAddress;     
      data.set('last_client_name', user);
      data.set('last_client_ip', remadres);
      data.setDateTime('last_client_datetime', now, true);
      if(data.isNew()){
        data.set('client_name', user);
        data.set('client_ip', remadres);
        data.setDateTime('client_datetime', now, true);
      }
      return data;
    }

    static setUserInfo(data:DataEntity, user:string){
      var date:Date = new Date();
      var remadres:string =  window.location.origin ;//RestService.ipAddress;       
      data.set('client_name', user);
      data.set('client_ip', remadres);
      data.setDateTime('client_datetime', date, true);      
      return data;
    }
}