import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerachGifsResponse } from '../interfaces/gifs-interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'du1Ge10kAGY2KALyUUTYGIvyZQYxOi7R';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  private _offset = 0;


  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  get offset() {
    return this._offset;
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    this._offset = JSON.parse(localStorage.getItem('offset')!) || 0;
  }

  async buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
      this._offset = 0;

      localStorage.setItem('historial', JSON.stringify(this._historial));
    } else {
      this._offset < 4999 ? this._offset += 10 : 0;
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)
      .set('offset', this.offset)
      
    this.http.get<SerachGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        console.log(resp);
        
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        localStorage.setItem('offset', JSON.stringify(this._offset));
      });

  }
}
