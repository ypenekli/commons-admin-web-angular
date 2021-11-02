
export class Pager {
   
    constructor(
        private offset: number = 0,
        private limit: number = -1,
        private count: number = -1
    ) {}

    public getOffset():number{
        return this.offset;
    }
    setOffset(value:number){
        this.offset = value;
    }
    public getLimit():number{
        return this.limit;
    }  
    setLimit(value:number){
        this.limit = value;
    }  
    public getCount():number{
        return this.count;
    }
    setCount(value:number){
        this.count = value;
    }
}