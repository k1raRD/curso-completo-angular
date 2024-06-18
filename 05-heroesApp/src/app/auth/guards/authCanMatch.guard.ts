import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";

export const authGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).verifyAuthentication()
          .pipe(
              tap(estaAutenticado => {
                if(!estaAutenticado) {
                  router.navigate(['./auth/login'])
                }
              })
            );

  // const isAuth = inject(AuthService).auth;

  // return isAuth.id ? true : false;
}