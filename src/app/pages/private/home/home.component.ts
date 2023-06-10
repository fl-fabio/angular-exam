import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { delay, map, take, takeUntil, tap } from 'rxjs';
import { Character, CharacterRimap } from 'src/app/models/Character';
import { CharactersService } from 'src/app/services/characters.service';
import { data } from 'src/app/mock/data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters:CharacterRimap[] | undefined = undefined;
  lengthResources:number | undefined = undefined;
  size = 10;
  offset = 0;
  currentPage = 0;
  filterForName = "";
  charactersService = inject(CharactersService);
  router = inject(Router);

  ngOnInit(): void {
    this.characters = data
    /* this.fetchCharacters(); */
  }

  fetchCharacters() {
    this.charactersService.getAllCharacters({
      ...(this.size ? { limit: this.size } : {}),
      ...(this.offset ? { offset: this.offset } : {}),
      ...(this.filterForName ? { nameStartsWith: this.filterForName } : {}),
    })
      .pipe(
        tap((response: any) => {
          this.lengthResources = response.data.total;
        }),
        map((response: any) =>
          response.data.results.map((elem: Character) => ({
            id: elem.id,
            name: elem.name,
            description: elem.description,
            thumbnail: elem.thumbnail.path + '.' + elem.thumbnail.extension
          }))
        ),
        delay(1000),
        take(this.size)
      )
      .subscribe({
        next: (res: CharacterRimap[]) => {
          console.log(res);
          res && (this.characters = res)
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onPageChange(event:PageEvent) {
    if(this.size === event.pageSize) {
      if(this.currentPage > event.pageIndex) {
        this.offset -= this.size;
        this.currentPage--;
      } else {
        this.offset += this.size;
        this.currentPage++;
      }
    } else {
      this.size = event.pageSize;
      this.currentPage = event.pageIndex
    }
    this.fetchCharacters();
  }

  searchForName(event: Event) {
    this.filterForName = (<HTMLInputElement>event.target).value;
    this.fetchCharacters();
  }
}
