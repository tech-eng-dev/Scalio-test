import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public name: string = '';

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  searchUser() {
    this.spinner.show();
    this.usersService.name = this.name;
    this.usersService.searchUsers()
      .subscribe((res: any) => {
        this.spinner.hide();
        const usersArray = res.items;
        usersArray.length = res.total_count;
        this.usersService.users.next(usersArray);
      }, (err: Error) => {
        alert(JSON.stringify(err));
        this.spinner.hide();
      });
  }
}
