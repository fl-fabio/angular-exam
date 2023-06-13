import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from 'src/app/pages/public/hero/hero.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { ButtonComponent } from 'src/app/components/button/button.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeroComponent,
    /* ButtonComponent */
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ],
  exports: [
    LoginComponent,
    HeroComponent
  ]
})
export class PublicModule { }
