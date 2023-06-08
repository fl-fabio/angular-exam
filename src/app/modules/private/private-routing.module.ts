import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/private/home/home.component';

const privateRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(privateRoutes)
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
