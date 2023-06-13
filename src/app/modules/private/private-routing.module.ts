import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleComponent } from 'src/app/components/title/title.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DetailsComponent } from 'src/app/pages/private/details/details.component';
import { FavoriteComponent } from 'src/app/pages/private/favorite/favorite.component';
import { HomeComponent } from 'src/app/pages/private/home/home.component';

const privateRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "favorites",
    component: FavoriteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ":id",
    component: DetailsComponent,
    canActivate: [AuthGuard]
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
