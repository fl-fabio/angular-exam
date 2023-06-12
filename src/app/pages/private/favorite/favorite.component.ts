import { Component, OnInit, inject } from '@angular/core';
import { CharacterRimap } from 'src/app/models/Character';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  serviceBookmarks = inject(BookmarkService);
  serviceCharacters = inject(CharactersService);
  idArray:string[] = [];
  favoritesCharacters:CharacterRimap[] = [];

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
