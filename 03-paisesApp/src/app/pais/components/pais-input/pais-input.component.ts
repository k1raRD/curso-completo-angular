import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDeBounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDeBounce.emit(valor);
      })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPersionada() {
    this.debouncer.next(this.termino);
  }
}
