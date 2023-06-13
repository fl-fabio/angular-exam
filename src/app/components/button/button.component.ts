import { Component, Input, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  bookmarkService = inject(BookmarkService);
  toastr = inject(ToastrService);
  name = '';
  @Input() id = '';
  bookmarkPresent:boolean | undefined = false;

  ngOnInit() {
    this.checkBookmark();
    this.name = this.bookmarkPresent ? "Add" : "Remove";
  }

  onAddBookmark = () => {
    this.bookmarkService.addBookmarkToUser(this.id).subscribe((added) => {
      this.bookmarkPresent = true;
      console.log('added', added);
      if (added) this.toastr.success('Bookmark added');
      else this.toastr.error('Bookmark already present');
    });
  };

  checkBookmark = async () => {
    try {
      this.bookmarkPresent = await this.bookmarkService.checkBookmarkExistsPerUser(this.id);
      console.log(this.bookmarkPresent)
    } catch (error) {
      console.error(error);
    }

    /* this.bookmarkService
        .checkBookmarkExistsPerUser(this.id)
        .pipe(
          take(1)
        )
        .subscribe((bookmarked) => {
          this.bookmarkPresent = bookmarked;
        }); */
  }

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
