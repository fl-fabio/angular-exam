import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from 'src/app/pages/public/hero/hero.component';
import { LoginComponent } from 'src/app/pages/public/login/login.component';

const publicRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
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
