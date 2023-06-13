import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from 'src/app/pages/private/home/home.component';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';
import { DetailsComponent } from 'src/app/pages/private/details/details.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { FavoriteComponent } from 'src/app/pages/private/favorite/favorite.component';

@NgModule({
  declarations: [
    HomeComponent,
    FavoriteComponent,
    CharacterCardComponent,
    DetailsComponent,
    LoaderComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    CharacterCardComponent,
    DetailsComponent,
    LoaderComponent,
    TitleComponent
  ]
})
export class PrivateModule { }
