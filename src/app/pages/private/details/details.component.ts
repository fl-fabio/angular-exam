import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { debounceTime, delay, take } from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';
import { CharacterRimap } from 'src/app/models/Character';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  bookmarkService = inject(BookmarkService);
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  charactersService = inject(CharactersService);
  loadingService = inject(LoadingService);
  toastr = inject(ToastrService);
  id = '';
  bookmarkPresent: boolean = false;
  character: CharacterRimap | undefined = undefined;
  loading = this.loadingService.loading$;

  ngOnInit() {
    this.scrollUp();

    this.id = this.activatedRoute.snapshot.queryParamMap.get('id') || '';
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchOneCharacter();
    this.bookmarkService
      .checkBookmarkExistsPerUser(this.id)
      .subscribe((bookmarked) => {
        this.bookmarkPresent = bookmarked;
      });
  }

  fetchOneCharacter() {
    this.charactersService
      .getOneCharacter(this.id)
      .subscribe({
        next: (res: CharacterRimap[]) => {
          res && (this.character = res[0]);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  scrollUp() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onAddBookmark = () => {
      this.bookmarkService.addBookmarkToUser(this.id).subscribe((added) => {
        this.bookmarkPresent = true;
        console.log('added', added);
        if (added) this.toastr.success('Bookmark added');
        else this.toastr.error('Bookmark already present');
      });
  };

  onDeleteBookmark = () => {
    this.bookmarkService
      .removeBookmarkToUser(this.id)
      .subscribe((removed) => {
        this.bookmarkPresent = false;
        if (removed) this.toastr.success('Bookmark removed');
        else this.toastr.error('Bookmark already not present');
      });
  };
}
