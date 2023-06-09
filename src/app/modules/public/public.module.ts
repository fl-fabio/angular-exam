import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HeroComponent } from 'src/app/pages/public/hero/hero.component';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
@NgModule({
  declarations: [
    LoginComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports:[
    HeroComponent,
    LoginComponent
  ]
})
export class PublicModule { }
