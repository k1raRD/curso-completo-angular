import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  @ViewChild('dinamicoForm') dinamicoForm!: NgForm;

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Alex',
    favoritos: [
      {
        id: 1, nombre: 'Metal Gear'
      },
      {
        id: 2, nombre: 'DeathStranding'
      }
    ]
  }

  nombreValido() {
    return this.dinamicoForm?.controls['nombre']?.errors &&
    this.dinamicoForm?.controls['nombre']?.touched
  }

  guardar() {
    console.log('Formulario posteado');
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

}
