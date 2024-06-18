import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}";

  constructor() { }

  noPuedeSerStrider = (control: FormControl): ValidationErrors | null => {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true
        }
      }
      formGroup.get(campo2)?.setErrors(null);

      return null;
    }
  }

}
