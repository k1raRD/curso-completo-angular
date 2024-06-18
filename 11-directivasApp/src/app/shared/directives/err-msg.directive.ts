import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrMsgDirective implements OnInit, OnChanges{

  htmlElement: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _mensaje: string = 'Este campo es requerido'
  private _valido: boolean = true;

  @Input() set color(valor: string) {
       this._color = valor;
       this.setColor();
  }
  // @Input() mensaje: string = 'Este campo es requerido';
  @Input() set mensaje(valor: string) {
    this._mensaje = valor;
    this.setMensaje();
    // this.htmlElement.nativeElement.textContent = valor;
  }
  @Input() clases: string[] = ['form-text'];

  @Input() set valido(valor: boolean) {
    valor ? this.htmlElement.nativeElement.classList.add('hidden')
          : this.htmlElement.nativeElement.classList.remove('hidden')
  }

  constructor( private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // console.log("NgOnInit en la directiva");
    this.setColor();
    this.setMensaje();
    this.setClases();
    // this.setMostrar()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['mensaje']) {
    //   const mensajes = changes['mensaje'].currentValue;
    //   this.htmlElement.nativeElement.textContent = mensajes;
    // }

    // if(changes['color']) {
    //   const color = changes['color'].currentValue;
    //   this.htmlElement.nativeElement.style.color = color;
    // }

    // console.log(changes);
  }

  
  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void {
    this.htmlElement.nativeElement.textContent = this._mensaje;
  }

  setClases(): void {
    this.htmlElement.nativeElement.classList.add(...this.clases);
  }

  // setMostrar(): void {
  //   this.htmlElement.nativeElement.style.display = this._valido ?  'inline' : 'none';
  // }
}
