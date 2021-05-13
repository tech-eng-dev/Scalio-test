import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = environment.backendApiUrl + '/';
  public users: ReplaySubject<any[]>;
  private perPageCount: number = 9;
  public name: string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.users = new ReplaySubject();
  }

  searchUsers(offset: number = 1): Observable<any> {
    return this.http.get(this.baseURL + `search/users?q=${this.name} in:login&page=${offset}&per_page=${this.perPageCount}`);
  }
}
