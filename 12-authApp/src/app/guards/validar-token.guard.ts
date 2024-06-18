import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const validarTokenGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  return inject(AuthService).validarToken()
    .pipe(
      tap(valid => {
        if (!valid) {
          router.navigateByUrl('/auth');
        }
      })
    );
};

export const validarTokenGuardMatch: CanMatchFn = (route, state) => {

  const router = inject(Router);

  return inject(AuthService).validarToken().pipe(
    tap(valid => {
      if (!valid) {
        router.navigateByUrl('/auth');
      }
    })
  );
}