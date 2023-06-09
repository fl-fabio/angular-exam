import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();

  private email: string = 'admin@admin.com';
  private password: string = 'Bls0906';
  private user: string | null = null;
  isAuthenticated: boolean = false;

  login = (email: string, password: string): boolean => {
    const isAuthenticated = this.authenticateUser(email, password);

    if (isAuthenticated) {
      localStorage.setItem('currentUser', email.split("@")[0]);
      this.currentUserSubject.next(email.split("@")[0]);
    }

    return isAuthenticated;

  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private authenticateUser(username: string, password: string): boolean {
    if(username===this.email && password === this.password) {
      this.user = this.email.split("@")[0];
      localStorage.setItem('currentUser', this.user);
      return true;
    } 
    return false;
  }


  constructor() { }
}
