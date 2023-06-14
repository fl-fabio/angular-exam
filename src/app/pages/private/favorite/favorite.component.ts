import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CharacterRimap } from 'src/app/models/Character';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { CharactersService } from 'src/app/services/characters.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  serviceBookmarks = inject(BookmarkService);
  serviceCharacters = inject(CharactersService);
  loadingService = inject(LoadingService);
  toastr = inject(ToastrService);
  route = inject(Router);
  idArray: string[] = [];
  favoritesCharacters: CharacterRimap[] = [];
  loading = this.loadingService.loading$;
  bookmarkDeleted = false;

  ngOnInit(): void {
    this.fetchId();
    this.scrollUp();
    this.bookmarkDeleted = sessionStorage.getItem('bookmarkDeleted') === 'true' ? true: false;
    console.log(this.bookmarkDeleted);
    this.serviceBookmarks
      .checkallBookmarkPerUser()
      .subscribe((bookmarked) => {
        this.bookmarkDeleted = bookmarked;
      });
  }

  fetchId = async () => {
    try {
      const data = await this.serviceBookmarks.getAllBookmarksbyUser();
      this.idArray = data!;
      this.fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData() {
    this.idArray.map((elem) => {
      this.serviceCharacters.getOneCharacter(elem).subscribe({
        next: (value) => {
          this.favoritesCharacters.push(value[0]);
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  scrollUp() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  onDeleteAllBookmarks = () => {
    this.serviceBookmarks.remevoAllBookmarksbyUser().subscribe((removedAll) => {
      if (removedAll) {
        this.favoritesCharacters = [];
        this.bookmarkDeleted=true;
        this.toastr.success('All Bookmark removed');
      }
    });
  };
}
