import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from 'src/app/pages/public/hero/hero.component';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { RegisterComponent } from 'src/app/pages/public/register/register.component';



const publicRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "hero",
    component: HeroComponent
  },
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
