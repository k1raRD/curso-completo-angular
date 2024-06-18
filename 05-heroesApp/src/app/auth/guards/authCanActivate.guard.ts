import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService).verifyAuthentication()
          .pipe(
              tap(estaAutenticado => {
                if(!estaAutenticado) {
                  router.navigate(['./auth/login'])
                }
              })
            );

  // return inject(AuthService).verifyAuthentication();

  // const isAuth = inject(AuthService).auth;

  // return isAuth.id ? true : false;
};
