import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {

  nombreLower: string = 'alex';
  nombreUpper: string = 'ALEX';
  nombreCompleto: string = 'aLeXaNdEr COLlAdO';

  fecha: Date = new Date(); // El dia de hoy
}
