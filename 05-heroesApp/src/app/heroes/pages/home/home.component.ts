import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent {

  get auth(): Auth {
    return this.authService.auth;
  }

  constructor(private router: Router,
              private authService: AuthService) {}

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
 