import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private email: string = 'admin@admin.com';
  private password: string = 'Bls0906';
  isAuthenticated: boolean = false;

  login(username: string, password: string) {
    if(username===this.email && password === this.password) {
      localStorage.setItem('currentUser', this.email.split("@")[0]);
      return true;
    } 
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


  constructor() { }
}
