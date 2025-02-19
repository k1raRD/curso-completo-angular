import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      body {
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent {

  get usuario() {
    return this.authService.usaurio;
  }

  constructor(private router: Router,
              private authService: AuthService){}

  logout() {
    this.authService.logout()
  }

}
