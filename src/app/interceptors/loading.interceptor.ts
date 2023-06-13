import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  loadingService = inject(LoadingService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadingService.setLoading(true);

    return next.handle(req).pipe(
      delay(1000),
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loadingService.setLoading(false);
          }
        },
        error => {
          this.loadingService.setLoading(false);
        }
      )
    );
  }
}

