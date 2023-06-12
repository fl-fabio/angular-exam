import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr'

export const AuthGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if (service.IsLoggedIn()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
  return true;
};
