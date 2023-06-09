import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/Users';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  authService = inject(AuthService);

  constructor() {}

  addBookmarkToUser = (id: string): Observable<boolean> => {
    const currentIdUser = sessionStorage.getItem('currentUser');

    return this.authService.getByUser(currentIdUser!).pipe(
      map((currentUser) => {
        if (currentUser) {
          const user = currentUser;

          // Verify id
          if (!user.bookmarks.includes(id)) {
            user.bookmarks.push(id);
            this.authService
              .updateUser(currentIdUser, { bookmarks: user.bookmarks })
              .subscribe({
                error: (error) => {
                  console.error(
                    "Errore durante l'aggiornamento dei segnalibri dell'utente:",
                    error
                  );
                },
              });
            return true;
          } else {
            return false;
          }
        } else {
          return false; // False if currentUser is not defined
        }
      })
    );
  };

  removeBookmarkToUser = (id: string): Observable<boolean> => {
    const currentIdUser = sessionStorage.getItem('currentUser');

    return this.authService.getByUser(currentIdUser!).pipe(
      map((currentUser) => {
        if (currentUser) {
          const user = currentUser;

          // Verify id
          if (user.bookmarks.includes(id)) {
            //delete bookmark by bookmarks
            user.bookmarks.splice(user.bookmarks.indexOf(id), 1);
            this.authService
              .updateUser(currentIdUser, { bookmarks: user.bookmarks })
              .subscribe({
                error: (error) => {
                  console.error(
                    "Errore durante l'aggiornamento dei segnalibri dell'utente:",
                    error
                  );
                },
              });
            return true;
          } else {
            return false;
          }
        } else {
          return false; // False if currentUser is not defined
        }
      })
    );
  };

  clearAllBookmark = () => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    this.authService.getByUser(currentIdUser!)
      .pipe(
        map(currentUser =>
          currentUser && currentUser.bookmarks.splice(0, currentUser.bookmarks.length),
          take(1)
        )
      ).toPromise()
  }

  getAllBookmarksbyUser = () => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    return this.authService
      .getByUser(currentIdUser!)
      .pipe(
        map((currentUser) => {
          if (currentUser) {
            return currentUser.bookmarks as Array<string>;
          } else {
            return [];
          }
        }),
        take(1)
      )
      .toPromise();
  };

  remevoAllBookmarksbyUser = () => {
    const currentIdUser = sessionStorage.getItem('currentUser');

    return this.authService.getByUser(currentIdUser!).pipe(
      map((currentUser) => {
        if (currentUser) {
          const user = currentUser;

          // Verify bookmarks
          if (user.bookmarks) {
            //delete bookmark by bookmarks
            user.bookmarks = [];
            this.authService
              .updateUser(currentIdUser, { bookmarks: user.bookmarks })
              .subscribe({
                error: (error) => {
                  console.error(
                    "Errore durante l'aggiornamento dei segnalibri dell'utente:",
                    error
                  );
                },
              });
            return true;
          } else {
            return false;
          }
        } else {
          return false; // False if currentUser is not defined
        }
      })
    );
  };

  checkBookmarkExistsPerUser = (bookmarkId: string): Observable<boolean> => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    return this.authService.getByUser(currentIdUser as string).pipe(
      map((currentUser) => {
        if (currentUser && currentUser.bookmarks) {
          return currentUser.bookmarks.includes(bookmarkId);
        }
        return false;
      }),
      take(1)
    );
  };

  checkallBookmarkPerUser = (): Observable<boolean> => {
    const currentIdUser = sessionStorage.getItem('currentUser');
    return this.authService.getByUser(currentIdUser as string).pipe(
      map((currentUser) => {
        if (currentUser && currentUser.bookmarks.length === 0) {
          return true;
        }
        return false;
      }),
      take(1)
    );
  };
}
