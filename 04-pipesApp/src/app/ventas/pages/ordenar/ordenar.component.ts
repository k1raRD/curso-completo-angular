import { Component } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.inrefaces';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html'
})
export class OrdenarComponent {

  enMayusculas: boolean = false;

  ordenarPor: string = 'nombre';

  heroes: Heroe[] = [
    {
      nombre: 'Superman',
      vuela: true,
      color: Color.azul
    },
    {
      nombre: 'Batman',
      vuela: false,
      color: Color.negro
    },
    {
      nombre: 'Robin',
      vuela: false,
      color: Color.verde
    },
    {
      nombre: 'Daredevil',
      vuela: false,
      color: Color.rojo
    },
    {
      nombre: 'Linterna Verde',
      vuela: false,
      color: Color.verde
    }
  ];


  toggleEnMayusculas(): void {
    this.enMayusculas = !this.enMayusculas;
  }

  cambiarOrden(valor: string) {
    this.ordenarPor = valor;
  }
}
