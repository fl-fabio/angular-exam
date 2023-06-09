import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from 'src/app/pages/private/home/home.component';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';
import { DetailsComponent } from 'src/app/pages/private/details/details.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    CharacterCardComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule
  ],
  exports: [
    HomeComponent,
    CharacterCardComponent,
    DetailsComponent
  ]
})
export class PrivateModule { }
