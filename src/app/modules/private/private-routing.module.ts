import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from 'src/app/pages/private/details/details.component';
import { FavoriteComponent } from 'src/app/pages/private/favorite/favorite.component';
import { HomeComponent } from 'src/app/pages/private/home/home.component';

const privateRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "favorites",
    component: FavoriteComponent
  },
  {
    path: ":id",
    component: DetailsComponent
  }

]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(privateRoutes),
  ],
  exports: [
    RouterModule,

  ]
})
export class PrivateRoutingModule { }
