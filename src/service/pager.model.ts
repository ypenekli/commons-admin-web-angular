
export class Pager {

    constructor(
        private pageSize: number = 10,
        private length: number = -1,
        private pageIndex: number = 0
    ) { }

    public getPageIndex(): number {
        return this.pageIndex;
    }
    setPageIndex(value: number) {
        this.pageIndex = value;
    }
    public getPageSize(): number {
        return this.pageSize;
    }
    setPageSize(value: number) {
        this.pageSize = value;
    }
    public getLength(): number {
        return this.length;
    }
    setLength(value: number) {
        this.length = value;
        if (value < this.pageSize) {
            this.pageSize = value;
        }
    }
    public reset(pageSize:number){
        this.pageSize = pageSize;
        this.length = -1;
        this.pageIndex = 0;
    }
}