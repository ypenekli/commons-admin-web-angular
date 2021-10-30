
export interface ITreeItem<T>{
    value:T;
    parentValue:T;
    name:string;
    description:string;
    level:number;
    isLeaf:boolean;
}

export class TreeItemNode<T>{
    children:TreeItemNode<T>[]=[];    
    node:ITreeItem<T>;

    constructor(item:ITreeItem<T>){
        this.node = item;        
    }

    get hasChildren():boolean{
        return this.children.length > 0;
    }

    get name():string{
        return this.node.name;
    }
    get level():number{
        return this.node.level;
    }
}