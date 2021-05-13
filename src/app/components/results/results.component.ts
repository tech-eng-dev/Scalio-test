import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public users: Array<any> = [];
  public loading: boolean = true;
  public displayedColumns: string[] = ['avatar_url', 'login', 'type'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private usersService: UsersService
  ) {
    this.initialize();
  }

  ngOnInit(): void {
  }

  initialize() {
    this.usersService.users.subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource<any>(this.users);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  getNextData(currentSize: any, offset: any, limit: any) {
    this.usersService.searchUsers(offset)
      .subscribe((res: any) => {
        this.users.length = currentSize;
        this.users.push(...res.items);
        this.users.length = res.total_count;
        this.dataSource = new MatTableDataSource<any>(this.users);  
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      }, (err: Error) => {
        alert(JSON.stringify(err));
      });
  }

  pageChanged(event: any) {
    this.loading = true;
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const previousSize = pageSize * pageIndex;
    this.getNextData(previousSize, (pageIndex + 1).toString(), pageSize.toString());
  }
}
