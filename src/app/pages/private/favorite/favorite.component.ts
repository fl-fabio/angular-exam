import { Component, OnInit, inject } from '@angular/core';
import { CharacterRimap } from 'src/app/models/Character';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { CharactersService } from 'src/app/services/characters.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  serviceBookmarks = inject(BookmarkService);
  serviceCharacters = inject(CharactersService);
  loadingService = inject(LoadingService);
  idArray:string[] = [];
  favoritesCharacters:CharacterRimap[] = [];
  loading = this.loadingService.loading$;

  ngOnInit(): void {
    this.fetchId();
  }

  fetchId = async () => {
    try {
      const data = await this.serviceBookmarks.getAllBookmarksbyUser();
      this.idArray = data!;
      this.fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  fetchData() {
    this.idArray.map(elem => {
      this.serviceCharacters.getOneCharacter(elem)
        .subscribe({
          next: (value) => {
            this.favoritesCharacters.push(value[0]);
          },
          error: (error) => {
            console.error(error);
          },
      })
    })
  }
}
