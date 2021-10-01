import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profesor } from '../interfaces/mi-app.interface';
import { MiAppService } from '../services/mi-app.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
})
export class ProfesoresComponent {

  idPrfPCSeleccionado: number = 0;

  @Input()
  profesoresDataPC: Profesor [] = [];

  @Output()
  onProfesorPC: EventEmitter<Profesor[]> = new EventEmitter();

  profesoresPC: Profesor[] = [];

  profesorPC: Profesor = {
    idPrf: undefined,
    nombre: undefined
  }

  verProfesores() {
    if((this.profesorPC.idPrf == null && this.profesorPC.nombre == null)
    || (this.profesorPC.nombre?.trim().length == 0)) {
      //this.profesoresPC = this.profesoresDataPC;
      this.profesoresDataPC = this.service.profesoresDataService;
      this.profesoresPC = this.profesoresDataPC;
    } else {
      for(let i = 0; i < this.profesoresDataPC.length; i++) {
        this.profesoresPC = [];
        if(this.profesoresDataPC[i].idPrf == this.profesorPC.idPrf || this.profesoresDataPC[i].nombre == this.profesorPC.nombre) {
          this.profesoresPC.push(this.profesoresDataPC[i]);
          break;
        }
      }
    }
    //Para enviar la informacion de this.profesoresPC al componente padre (MainPageComponent)
    this.onProfesorPC.emit(this.profesoresPC);
  }

  verAsiganturasByProfesor(idPrfAC: number) {
    this.service.getAsignaturasByProfesorDataService(idPrfAC);
  }

  constructor(private service: MiAppService) {
    console.log("Componente Profesores");
  }
}
