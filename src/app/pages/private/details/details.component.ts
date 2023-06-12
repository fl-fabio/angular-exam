import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, take } from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';
import { Character, CharacterRimap } from 'src/app/models/Character';
import { LoadingService } from 'src/app/services/loading.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  bookmarkService = inject(BookmarkService);

  id = '';
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  charactersService = inject(CharactersService);
  loadingService = inject(LoadingService);
  toastr = inject(ToastrService)
  bookmarkAdded: boolean = false;
  character:CharacterRimap | undefined = undefined;
  loading = this.loadingService.loading$;
  added: boolean = false;

  ngOnInit() {
    this.scrollUp();

    this.id = this.activatedRoute.snapshot.queryParamMap.get('id') || '';
    this.activatedRoute.params
      .pipe(
        take(1)
      )
      .subscribe(params => {
        this.id = params['id'];
    })
    this.fetchOneCharacter();
    this.bookmarkService.checkBookmarkExistsPerUser(this.id).subscribe((bookmarked) => {
      this.added = bookmarked;
    })
  }

  fetchOneCharacter() {
    this.charactersService.getOneCharacter(this.id)
      .pipe(
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
          console.log(res);
          res && (this.character = res[0])
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  scrollUp() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onAddBookmark = () => {
    this.bookmarkAdded = this.bookmarkService.addBookmarkToUser(this.id);
    this.bookmarkService.getAllBookmarksbyUser().subscribe((bookmarks) => {
      console.log(bookmarks);
    });

    if (this.bookmarkAdded) this.toastr.success('Bookmark added');
    else this.toastr.error('Bookmark already present');
  }
}
