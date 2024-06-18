import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{ 
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-70.02172673191184,18.520921107580403];

  // Arreglo de marcadores
  markers: MarkerColor[] = []
  
  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage()

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

    
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.markers.push({
      color, 
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
  }

  irMarcador(marker: MarkerColor ) {
    this.mapa.flyTo({
      center: marker.marker!.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarkerColor[] = []

    this.markers.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if(!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });

    });
  }

  borrarMarcador(i: number) {
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }
}
