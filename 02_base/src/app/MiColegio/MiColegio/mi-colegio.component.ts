import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: 'app-mi-colegio',
  templateUrl: 'mi-colegio.component.html'
})
export class MiColegioComponent {

  profesores: Profesor[] = [];
  profesorSel: Profesor = {};
  asignaturas: Asignatura[] = [];

  constructor(private http: HttpClient) {}

  getProfesores() {
    return this.http.get('/MiColegio-web/Rest/getProfesores')
    .subscribe( (data: any) => {
      this.profesores = data;
      console.log(this.profesores);
    });
  }

  getAsignaturasByProfesor() {
    this.http.post('/MiColegio-web/Rest/getAsignaturasByProfesor', { idPrf: this.profesorSel.idPrf })
    .subscribe( (data: any) => {
      this.asignaturas = data;
      console.log(this.asignaturas);
    });
  }
}

interface Profesor {
  idPrf?: number;
  nombre?: string;
}

interface Asignatura {
  idAsg?: number;
  nombre?: string;
}
