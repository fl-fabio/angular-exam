import { Component, OnInit, inject } from '@angular/core';
import { forkJoin, map, switchMap, take } from 'rxjs';
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

    /* console.log(this.favoritesCharacters) */
    /* this.serviceBookmarks.getAllBookmarksbyUser()
    .pipe(
      map(elem => {
        elem.map(character => {
          this.serviceCharacters.getOneCharacter(character)
          .pipe(
            map(value => ({
              id:value.id,
              name: value.name,
              description: value.description,
              thumbnail: value.thumbnail.path + '.' + value.thumbnail.extension
            })
          ),
          take(1)
        )
          .subscribe({
            next: data => {
              this.favoritesCharacters.push(data)
              console.log(data)
            },
            error: error => {
              console.error(error)
            }
          })
        })
      })
    )
      .subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          console.error(error)
        }
      },
    )
  } */
  }

  /* fetchData() {
    this.serviceBookmarks.getAllBookmarksbyUser().
      pipe(
        map(arrayChar =>
          arrayChar.map(singleChar => {
            this.serviceCharacters.getOneCharacter(singleChar)
              .subscribe(
                elem => this.favoritesCharacters.push(elem)
              )
          })),
      )
      .subscribe({
        next(value) {
          console.log(value)
        },
        error(err) {
            console.error(err)
        },
      })
  } */

  fetchId = async () => {
    try {
      const data = await this.serviceBookmarks.getAllBookmarksbyUser();
      this.idArray = data!;
      /* this.fetchData(); */
    } catch (error) {
      console.error(error);
    }
  }

  /* fetchData() {
    this.idArray.map(elem => {
      console.log("sono quiaaaaaaaaaaaaaaaa")
      this.serviceCharacters.getOneCharacter(elem)
        .subscribe({
          next(value:CharacterRimap) {
            console.log(value)
          },

          error: (error) => {
            console.error(error);
          }
        })
    })
  } */
}
