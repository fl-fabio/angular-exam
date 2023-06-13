import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime, delay, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs';
import { Character, CharacterRimap } from 'src/app/models/Character';
import { CharactersService } from 'src/app/services/characters.service';
import { data } from 'src/app/mock/data';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { PaginationCharacters } from 'src/app/models/Pagination';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  charactersService = inject(CharactersService);
  router = inject(Router);
  loadingService = inject(LoadingService);
  paginationService = inject(PaginationService);
  route = inject(Router);
  characters:CharacterRimap[] | undefined = undefined;
  loading = this.loadingService.loading$;
  lengthResources:number | undefined = undefined;
  pagination:PaginationCharacters | undefined = undefined
  filterForName = "";
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.characters = data
    this.getFilterForName();
    this.getLengthResource();
    this.fetchCharacters();

    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.fetchCharacters();
      });
  }

  fetchCharacters() {
    this.getFilterForName();
    this.getPagination();
    this.charactersService.getAllCharacters({
      ...(this.pagination!.size ? { limit: this.pagination!.size } : {}),
      ...(this.pagination!.offset ? { offset: this.pagination!.offset } : {}),
      ...(this.filterForName ? { nameStartsWith: this.filterForName } : {}),
    })
      .pipe(
        debounceTime(1000),
        /* delay(1000), */
        tap((response: any) => {
          this.paginationService.setLengthResources(response.data.total);
        }),
        map((response: any) =>
          response.data.results.map((elem: Character) => ({
            id: elem.id,
            name: elem.name,
            description: elem.description,
            thumbnail: elem.thumbnail.path + '.' + elem.thumbnail.extension
          }))
        ),
        take(1)
      )
      .subscribe({
        next: (res: CharacterRimap[]) => {
          console.log("chiama");
          res && (this.characters = res),
          this.getLengthResource();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  getPagination() {
    this.paginationService.pagination.subscribe((value) => this.pagination = value)
  }

  getLengthResource() {
    this.paginationService.lengthResources.subscribe(value => this.lengthResources = value);
  }

  getFilterForName() {
    this.paginationService.filterForName.subscribe(value => this.filterForName = value);
  }

  clearFilter() {
    this.paginationService.setFilterForName('');
    this.fetchCharacters();
  }

  onPageChange(event:PageEvent) {
    if(this.pagination!.size === event.pageSize) {
      if(this.pagination!.currentPage > event.pageIndex) {
        this.pagination!.offset -= this.pagination!.size;
        this.pagination!.currentPage--;
      } else {
        this.pagination!.offset += this.pagination!.size;
        this.pagination!.currentPage++;
      }
    } else {
      this.pagination!.size = event.pageSize;
      this.pagination!.currentPage = event.pageIndex
    }
    this.paginationService.setPagination(
      this.pagination!.size,
      this.pagination!.offset,
      this.pagination!.currentPage
    );
    this.scrollUp();
    this.fetchCharacters();
  }

  searchForName(event: Event) {
    const searchTerm = (<HTMLInputElement>event.target).value;
    this.paginationService.setFilterForName(searchTerm);
    this.searchSubject.next(searchTerm);
  }

  scrollUp() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
