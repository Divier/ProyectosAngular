import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignaturasResponse } from '../interfaces/asignaturas-response.interface';
import { Profesor } from '../interfaces/mi-app.interface';
import { ProfesoresResponse } from '../interfaces/profesores-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MiAppService {

  profesoresDataService: ProfesoresResponse[] = [];
  asignaturasByProfesorDSSource: AsignaturasResponse[] = [];

  private profesoresDataArray: Profesor[] = [
    {
      idPrf: 1,
      nombre: 'ProfeA'
    },
    {
      idPrf: 2,
      nombre: 'ProfeB'
    },
    {
      idPrf: 3,
      nombre: 'ProfeC'
    }
  ];

  get profesoresData(): Profesor[] {
    return [...this.profesoresDataArray];
  }

  get asignaturasByProfesorDataService(): AsignaturasResponse[] {
    return [...this.asignaturasByProfesorDSSource];
  }

  constructor(private http: HttpClient) { }

  getProfesoresDataService() {

    this.http.get<ProfesoresResponse[]>('MiColegio-web/Rest/getProfesores')
    .subscribe( (resp) => {
      this.profesoresDataService = resp;
      console.log("LOAD SERVICE:", resp);
    });
  }

  getAsignaturasByProfesorDataService( idPrf: number) {

    this.http.post<AsignaturasResponse[]>('MiColegio-web/Rest/getAsignaturasByProfesor', { idPrf: idPrf })
    .subscribe( (resp) => {
      console.log("getAsignaturasByProfesor", resp);
      this.asignaturasByProfesorDSSource = resp;
    });
  }
}
