import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];


  // UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) {

  }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    // .subscribe(region => {
    //   console.log(region)
    //   this.paisesService.getPaisesPorRegion(region).subscribe(paises => {
    //     console.log(paises);
    //     this.paises = paises;
    //   })
    // })

    // Cuando cambia la region.
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap((_) => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      }),
      switchMap(region => this.paisesService.getPaisesPorRegion(region))
    )
    .subscribe(paises => {
      console.log(paises);
      this.paises = paises
      this.cargando = false;
    });

    // Cuando cambia el pais.
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap((_) => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo)),
      switchMap(val => {
        if(val){
          let pais = val[0] ;
          return this.paisesService.getPaisesPorCodigos(pais.borders) 
        } else {
         return of([])
        }
      })
    )
    .subscribe(paises => {
      console.log(paises);
        this.fronteras = paises;
        this.cargando = false;
    })

  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
