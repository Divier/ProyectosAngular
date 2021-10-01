import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesoresResponse } from '../interfaces/profesores-response.interface';
import { AsignaturasResponse } from '../interfaces/asignaturas-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private urlBase: string = '/ApiCol/Rest';

  constructor(private http: HttpClient) { }

  consultarProfesores(): Observable<ProfesoresResponse[]> {
    const url = `${this.urlBase}/getProfesores`;
    return this.http.get<ProfesoresResponse[]>(url);
  }

  consultarAsignaturasByProfesor(idPrf: number): Observable<AsignaturasResponse[]> {
    const url = `${this.urlBase}/getAsignaturasByProfesor`;
    return this.http.post<AsignaturasResponse[]>(url, { idPrf: idPrf });
  }
}
