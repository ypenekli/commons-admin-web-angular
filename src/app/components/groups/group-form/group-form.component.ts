import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/model/base-form';
import { AppFunc } from 'src/app/model/entities/app-func.model';
import { App } from 'src/app/model/entities/app.model';
import { Group } from 'src/app/model/entities/group.model';
import { AppFuncModel } from 'src/app/model/repositories/app-func.repository';
import { AppModel } from 'src/app/model/repositories/app.repository';
import { GroupModel } from 'src/app/model/repositories/group.repository';
import { Session } from 'src/app/model/session.model';
import { TreeDatabase } from 'src/app/model/tree/tree-database';
import { TreeItemNode } from 'src/app/model/tree/tree-item-node';
import { Result } from 'src/service/result.model';
import { TreeControl, NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AppFormComponent } from '../../apps/app-form/app-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent extends BaseForm implements OnInit {

  groupAppFuncDisplayedColumns: string[] = ['selected', 'id', 'name'];

  id:number = -1;
  group: Group = new Group();
  apps:App[] = [];
  groupAppFuncs:AppFunc[] = []; 
  selection = new SelectionModel<AppFunc>(true, []);
  

  constructor(
    private session: Session,
    private aRoute: ActivatedRoute,
    private repository: GroupModel,
    private appModel:AppModel,
    private appFuncModel:AppFuncModel,
    private router:Router,
    private snackBar:MatSnackBar) {
      super(aRoute);        
      this.id = +aRoute.snapshot.params['id']; 
    }

  ngOnInit(): void {
    this.group = this.repository.getGroup(this.id);
    this.appModel.findApps(this.session.getUser().id)
    .subscribe(res=>{
      this.apps = this.appModel.getApps();
    });

    if(this.group != null && !this.group.isNew()){
      this.appFuncModel.findGroupAppFuncs(this.id, this.group.appId)
      .subscribe(res=>{
        this.groupAppFuncs = this.appFuncModel.getAppFuncs();
        
      })
    }
   
  }
 

  save(form: NgForm) {   
    this.repository.saveGroup(this.group, this.session.getUser())
    .subscribe(message=>{
      this.snackBar.open(message, $localize`:@@save:`, {
        duration: 2000,
        });
      });    
  }
  getSaveMessage():String{
    let res = this.repository.getSaveResult();
    if(res)
      return res.getMessage();
    else
      return "";
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.groupAppFuncs.length;
    return numSelected === numRows;
  }

  isSubHasValue(row:AppFunc) {
     const numSelected = AppFuncModel.getSubFuncsCount(row.hierarchy, this.selection.selected); 
     const numRows = AppFuncModel.getSubFuncsCount(row.hierarchy, this.groupAppFuncs); 
     console.log(`id:${row.hierarchy} selected:${numSelected}, childNumber:${numRows}`);
    return numSelected > 0 &&  numSelected !== numRows;
  }

  isSubAllSelected(row:AppFunc) {
    const numSelected = AppFuncModel.getSubFuncsCount(row.hierarchy, this.selection.selected); 
    const numRows = AppFuncModel.getSubFuncsCount(row.hierarchy, this.groupAppFuncs); 
    return numSelected > 0 && numSelected === numRows;
  }

  isChecked(row:AppFunc){
    return (row.isLeaf && this.selection.isSelected(row)) || this.isSubAllSelected(row)
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.groupAppFuncs.forEach(row => this.selection.select(row));
  }
  subToggle(event:MatCheckboxChange , row:AppFunc){    
    this.togleSelection(event, row);
    let subFuncs:AppFunc[] = AppFuncModel.getSubFuncs(row.id, this.groupAppFuncs);
    if(subFuncs != null && subFuncs.length > 0){
      subFuncs.forEach(subrow=>{
        this.togleSelection(event, subrow);        
        if(!subrow.isLeaf){
          this.subToggle(event, subrow);
        } 
        
      })
    }
  }

  togleSelection(event:MatCheckboxChange, row:AppFunc){   
    if(event.checked){
      this.selection.select(row);
    }else{
      this.selection.deselect(row);
    }
  }

  onLogSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }
  onDelete() {
    this.selection.selected.forEach(s => console.log(s.name));
  }
}
