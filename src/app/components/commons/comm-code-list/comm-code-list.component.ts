import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Common } from 'src/app/model/entities/common.model';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-comm-code-list',
  templateUrl: './comm-code-list.component.html',
  styleUrls: ['./comm-code-list.component.css']
})
export class CommCodeListComponent implements OnInit, AfterViewInit {
  parent_id:number = 0;
  common: Common; 

  displayedColumns: string[] = ['abrv', 'id', 'name'];

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private session:Session,
    private repository:CommonModel,
    private aRoute: ActivatedRoute) {

      aRoute.params.subscribe(params => {
          this.parent_id = params['parent_id']; 
          if(this.parent_id == null){
            this.parent_id = 0;
          }
          
        }
      )

      //this.parent_id = aRoute.snapshot.params['parent_id'];       
      //if(this.parent_id == null){
      //  this.parent_id = 0;
      //}
      this.common = new Common(-1);
     }
  ngAfterViewInit(): void {
    this.paginator.page
        .pipe(
            tap(() => this.commons)
        )
        .subscribe();
  }

  ngOnInit(): void {
    this.repository.findByParent(this.parent_id)
    .subscribe(res=>{
      if(this.commons.length > 0){
        this.common = this.commons[0];             
      }
    });

   
  }

  get commons():Common[]{
    return this.repository.getCommons();
  }  

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}