import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/public/login/login.component';

const publicRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(publicRoutes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
