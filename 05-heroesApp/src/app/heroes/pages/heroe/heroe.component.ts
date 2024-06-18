import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }

    .img-container {
      height: 20%;
      width: 40%;
      margin: 0 auto;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  heroeId: string = '';

  constructor(private activatedRoutes: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoutes.params
      .pipe(switchMap( ({id}) => this.heroesService.getHeroeById(id)))
      .subscribe(hero => this.heroe = hero);
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
