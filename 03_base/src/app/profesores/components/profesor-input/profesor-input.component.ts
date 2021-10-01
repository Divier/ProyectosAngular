import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profesor-input',
  templateUrl: './profesor-input.component.html'
})
export class ProfesorInputComponent {

  @Output()
  onProfesorId : EventEmitter<number> = new EventEmitter();

  @Input()
  placeholder: string = '';

  idPrf?: number;

  constructor() { }

  buscar() {
    this.onProfesorId.emit(this.idPrf);
  }
}
