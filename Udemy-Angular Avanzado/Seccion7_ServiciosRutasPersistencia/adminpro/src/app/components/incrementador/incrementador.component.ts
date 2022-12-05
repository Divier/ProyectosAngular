import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() progresoE: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    if(this.progreso >= 100) {
      this.progreso = 100;
    }
    if(this.progreso <= 0) {
      this.progreso = 0;
    }
    this.progresoE.emit(this.progreso);
  }
}
