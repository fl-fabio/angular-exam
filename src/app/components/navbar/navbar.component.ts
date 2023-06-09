import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  router = inject(Router);
  authService = inject(AuthService);
  admin: null | string = null

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.admin = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
