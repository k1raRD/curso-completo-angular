import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country, Translation } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  trans!: string[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.paisService.getPaisByName(id)),
        tap(console.log)
      )
      .subscribe(pais => {
        this.pais = pais[0]; 
        this.trans = Object.keys(this.pais.translations);
      });

    // this.activatedRoute.params
    //   .subscribe(({ id }) => {
    //     this.paisService.getPaisByName(id)
    //       .subscribe(pais => {
    //         this.paises = pais;
    //       });
    //   });
  }

}
