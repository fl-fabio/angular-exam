import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from 'src/app/pages/private/home/home.component';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';
import { DetailsComponent } from 'src/app/pages/private/details/details.component';
import { MaterialModule } from '../material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { LoadingInterceptor } from 'src/app/interceptors/loading.interceptor';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { ButtonComponent } from 'src/app/components/button/button.component';

@NgModule({
  declarations: [
    HomeComponent,
    CharacterCardComponent,
    DetailsComponent,
    LoaderComponent,
    TitleComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  /* providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ], */
  exports: [
    HomeComponent,
    CharacterCardComponent,
    DetailsComponent,
    LoaderComponent
  ]
})
export class PrivateModule { }
