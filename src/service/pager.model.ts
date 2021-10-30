
export class Pager {
   
    constructor(
        private offset: number = 0,
        private limit: number = -1,
        private count: number = -1
    ) {}

    public getOffset():number{
        return this.offset;
    }
    public getLimit():number{
        return this.limit;
    }    
    public getCount():number{
        return this.count;
    }
}