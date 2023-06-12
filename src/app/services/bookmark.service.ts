import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/Users';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  authService = inject(AuthService);

  constructor() {}

  addBookmarkToUser = (id: string): boolean => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    let isBookmarkAdded = false;

    this.authService.getByUser(currentIdUser!).subscribe({
      next: (currentUser) => {
        if (currentUser) {
          const user = currentUser;

          // Verifica se l'ID è già presente nell'array bookmarks
          if (!user.bookmarks.includes(id)) {
            // Aggiungi l'ID all'array bookmarks
            user.bookmarks.push(id);
            isBookmarkAdded = true;
          }

          // Update the user's bookmarks using AuthService's updateUser method
          this.authService
            .updateUser(currentIdUser, { bookmarks: user.bookmarks })
            .subscribe({
              next: () => {
                // Bookmark added successfully, you can perform any additional actions here
              },
              error: (error) => {
                console.error(
                  "Error while updating the user's bookmarks:",
                  error
                );
              },
            });
        }
      },
      error: (error: any) => {
        console.error("Error while updating the user's bookmarks:", error);
      },
    });

    return isBookmarkAdded;
  };

  getAllBookmarksbyUser = (): Observable<Array<string>> => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    return this.authService.getByUser(currentIdUser!).pipe(
      map((currentUser) => {
        if (currentUser) {
          return currentUser.bookmarks as Array<string>;
        } else {
          return [];
        }
      })
    );
  };
}
