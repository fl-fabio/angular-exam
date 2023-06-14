import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pages/public/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path: "",
    loadChildren: () =>
        import("../app/modules/public/public.module").then((m) => m.PublicModule),
  },
  {
    path: "",
    loadChildren: () =>
        import("../app/modules/private/private.module").then((m) => m.PrivateModule),
  },
  {
    path: "**",
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
