import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div{
        width: 100%;
        height: 150px;
        margin: 0;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit{
  
  @Input() lngLAT: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef;

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLAT,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
          .setLngLat(this.lngLAT)
          .addTo(mapa)
  }

}
