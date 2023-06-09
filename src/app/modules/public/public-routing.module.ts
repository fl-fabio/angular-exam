import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/public/login/login.component';

const publicRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(publicRoutes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
