import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITreeItem, TreeItemNode } from "./tree-item-node";

@Injectable()
export class TreeDatabase<T>{    
    dataChange:BehaviorSubject<TreeItemNode<T>[]>=new BehaviorSubject<TreeItemNode<T>[]>([]);
    //get data():TreeItemNode<T>[]{return this.dataChange.value;}
    data:TreeItemNode<T>;

    constructor(
        public flatList:ITreeItem<T>[]){           
            this.data = this.buildTreeNode(flatList, 0);
        const data : TreeItemNode<T>[] =[this.data];
        this.dataChange.next(data);        
    }

    buildTreeNode(list:ITreeItem<T>[], pI:number):TreeItemNode<T>{
        if(list != null && pI < list.length){
            let parent:ITreeItem<T> = list[pI];
            let parentNode : TreeItemNode<T> = new TreeItemNode(parent);
            let parentValue:T = parent.value;
            for (let index = pI + 1; index < list.length;  ++index){
                const e : ITreeItem<T> = list[index];               
                let node:TreeItemNode<T>;
                if(!e.isLeaf){
                    node = this.buildTreeNode(list, index);
                }else{
                    node = new TreeItemNode(e);
                }
                if(e.parentValue == parentValue && node != null){
                    parentNode.children.push(node);
                }
            }
            return parentNode;
        }
    }
}