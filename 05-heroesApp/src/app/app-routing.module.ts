import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { authGuard as authGuardCanMatch } from './auth/guards/authCanMatch.guard';
import { authGuard as authGuardCanActivate } from './auth/guards/authCanActivate.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canMatch: [ authGuardCanMatch ],
    canActivate: [authGuardCanActivate]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**', 
    redirectTo: '404'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
