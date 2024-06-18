import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';
  private filters: string = '?fields=name,capital,flags';

  constructor(private http: HttpClient) { }

  get httpParams() {
    return new HttpParams()
    .set('fields','name,capital,flags,population');
  }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  getPaisByName(id: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${id}`;
    return this.http.get<Country[]>(url);
  }


  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

}
