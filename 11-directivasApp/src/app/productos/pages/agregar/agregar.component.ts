import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  });

  nombre: string = 'Fernando Herrera';

  color: string = 'yellow';

  constructor(private fb: FormBuilder){}

  campoValido(campo: string): boolean {
    return this.miFormulario.get(campo)?.invalid || false;
  }

  cambiarNombre(val: string) {
    this.nombre = Math.random().toString();
  }

  cambiarColor(val: string) {
    const color = "#xxxxxx".replace(/x/g, y =>(Math.random()*16|0).toString(16));
    this.color = color;
  }
}
