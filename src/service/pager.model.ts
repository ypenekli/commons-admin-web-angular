
export class Pager {

    constructor(
        private pageIndex: number = 0,
        private pageSize: number = -1,
        private length: number = -1
    ) {}

    public getPageIndex():number{
        return this.pageIndex;
    }
    setPageIndex(value:number){
        this.pageIndex = value;
    }
    public getPageSize():number{
        return this.pageSize;
    }  
    setPageSize(value:number){
        this.pageSize = value;
    }  
    public getLength():number{
        return this.length;
    }
    setLength(value:number){
        this.length = value;
    }
}