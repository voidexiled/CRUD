import { User } from '../_models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7245/api/';
  private currenUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currenUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'users', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currenUserSource.next(user);
        }
      })
    )
  }
  setCurrentUser(user: User) {
    this.currenUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    //this.currenUserSource.next(null);
  }
}
