import { Component, Input, OnInit } from '@angular/core';
import { MiAppService } from '../services/mi-app.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html'
})
export class AsignaturasComponent {

  @Input()
  idPrfAC: number = 0;

  get asignaturasByProfesor() {
    return this.service.asignaturasByProfesorDataService;
  }

  constructor(private service: MiAppService) {
    console.log("Componente Asignaturas");
  }

}
