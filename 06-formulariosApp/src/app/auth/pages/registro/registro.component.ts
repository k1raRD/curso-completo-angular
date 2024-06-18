import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { emailPattern, noPuedeSerStrider, nombreApellidoPattern } from 'src/app/shared/validators/validaciones';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']) {
      return 'Email es obligatorio';
    } else if(errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    } else if(errors?.['emailTomado']) {
      return 'El email ya existe';
    }
    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorsService,
              private emailValidator: EmailValidatorService) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Alex Collado',
      email: 'test1@mail.com',
      username: 'K1rard',
      password: '123456',
      password2: '123456'
    })
  }

  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required']
  //         && this.miFormulario.get('email')?.touched;
  // }

  // emailFomato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //         && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //         && this.miFormulario.get('email')?.touched;
  // }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    
    this.miFormulario.markAllAsTouched();
  }
}
