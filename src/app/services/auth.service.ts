import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User, Users } from '../models/Users';
import { Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  apiURL = 'http://localhost:3000/users';

  getAll = (): Observable<Users> => {
    return this.http.get<Users>(this.apiURL);
  };

  getByEmail = (email: string): Observable<User | undefined> => {
    return this.getAll().pipe(
      map((users: Users) => users.find((user: User) => user.email === email)),
      first()
    );
  };

  getByUser = (userName: string): Observable<User | undefined> => {
    return this.getAll().pipe(
      map((users: Users) => users.find((user: User) => user.id === userName)),
      first()
    );
  };

  registerUser = (inputData: any) => {
    return this.http.post(this.apiURL, inputData);
  };

  updateUser = (code: any, inputData: any) => {
    return this.http.put(this.apiURL + '/' + code, inputData);
  };

  IsLoggedIn = () => {
    return sessionStorage.getItem('currentUser') != null;
  };

  GetUserRole = () => {
    return sessionStorage.getItem('userRole') != null
      ? sessionStorage.getItem('userRole')?.toString()
      : '';
  };
}
