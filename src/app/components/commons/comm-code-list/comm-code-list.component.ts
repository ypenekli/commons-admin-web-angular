import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Common } from 'src/app/model/entities/common.model';
import { CommonModel } from 'src/app/model/repositories/common.repository';
import { Session } from 'src/app/model/session.model';
import { Pager } from 'src/service/pager.model';

@Component({
  selector: 'app-comm-code-list',
  templateUrl: './comm-code-list.component.html',
  styleUrls: ['./comm-code-list.component.css']
})
export class CommCodeListComponent implements OnInit, AfterViewInit {
  parent_id: number = 0;
  common: Common;

  pager: Pager;
  displayedColumns: string[] = ['abrv', 'id', 'name'];
 
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private session: Session,
    private repository: CommonModel,
    private aRoute: ActivatedRoute) {

    this.pager = new Pager();
    aRoute.params.subscribe(params => {
      this.parent_id = params['parent_id'];
      if (this.parent_id == null) {
        this.parent_id = 0;
      }

    }
    )
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
    this.findCommons();
  }

  private findCommons(): void {
    this.repository.findByParent(this.parent_id, this.pager)
      .subscribe(res => {
        if (this.commons.length > 0) {
          this.common = this.commons[0];
          this.pager = res;
        }
      });
  }

  get commons(): Common[] {
    return this.repository.getCommons();
  }

  handlePageEvent(event: PageEvent) {
    this.pager.setPageIndex(event.pageIndex);
    this.pager.setPageSize(event.pageSize);
    this.pager.setLength(event.length);
    this.findCommons();
  }
}