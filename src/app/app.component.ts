import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bls-angular-exam';
  router = inject(Router);
  isNavbarRequired = false;

  ngDoCheck(): void {
    let currentUrl=this.router.url;
    if(currentUrl=='/login' || currentUrl=='/register') {
      this.isNavbarRequired=false;
    } else {
      this.isNavbarRequired=true;
    }
  }
}
