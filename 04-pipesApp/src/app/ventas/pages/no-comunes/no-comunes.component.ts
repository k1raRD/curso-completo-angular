import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html'
})
export class NoComunesComponent {
  // i18nSelect
  nombre: string = 'Alex';
  genero: string = 'masculino';
  toggle: boolean = false;

  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  // i18nPlural
  clientes: string[] = ['Maria', 'Pedro', 'Juan'];
  clientesMapa = {
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    'other': `tenemos # clientes esperando`
  }

  cambiarPersona() {
    if (this.genero === 'masculino') {
      this.nombre = 'Melisa'
      this.genero = 'femenino'
    } else {
      this.nombre = 'Alex';
      this.genero = 'masculino';
    }
  }

  borrarCliente() {
    this.clientes.length === 0 
    ? this.clientes = ['Maria', 'Pedro', 'Juan'] 
    : this.clientes.pop()
  }

  // KeyValue Pipe
  persona = {
    nombre: 'Alex',
    edad: 20,
    direccion: 'Ottawa, Canada'
  }

  // Json Pipe
  heroes = [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      value: true
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ]

  // Async Pipe

  miObservable = interval(1000); // 0, 1, 2, 3, 4, 5

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de la promesa');
    }, 3500);
  });
}
