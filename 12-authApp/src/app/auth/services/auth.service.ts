import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: Usuario;

  get usaurio() {
    return {...this._user}
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  registro(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
            .pipe(
              tap(({ok, token}) => {
                if(ok) {
                  localStorage.setItem('token', token!);
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            );
  }

  login( email: string, password: string ) {
    const url = `${this.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
            .pipe(
              tap(resp => {
                if(resp.ok) {
                  localStorage.setItem('token', resp.token!);
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
          .pipe(
            map(resp => {
              localStorage.setItem('token', resp.token!);
              this._user = {
                name: resp.name!,
                uid: resp.uid!,
                email: resp.email!
              }
              return resp.ok;
            }),
            catchError(err => of(false))
          )  
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
