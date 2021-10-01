import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura } from '../interfaces/asignatura.interface';
import { Response } from '../interfaces/response.interface';
import { Colegio } from '../interfaces/colegio.interface';
import { Curso } from '../interfaces/curso.interface';
import { Horario } from '../interfaces/horario.interface';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Profesor } from '../interfaces/profesor.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseURL: string = environment.baseURL;
  private apiUrlBase: string = '/ApiCol/Rest';
  private apiUrlContextListAll: string = '/ListAll';
  private apiUrlContextReg: string = '/Reg';
  private apiUrlContextMod: string = '/Mod';
  private apiUrlContextDel: string = '/Del';

  constructor(private http: HttpClient) { }

  // Colegios
  getColegios(): Observable<Colegio[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getColegios`;
    return this.http.get<Colegio[]>(url);
  }

  saveColegio(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveColegio`;
    return this.http.post<Response>(url, body);
  }

  updateColegio(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateColegio`;
    return this.http.put<Response>(url, body);
  }

  deleteColegio(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteColegio/${id}`;
    return this.http.delete<Response>(url);
  }

  // Cursos
  getCursos(): Observable<Curso[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getCursos`;
    return this.http.get<Curso[]>(url);
  }

  saveCurso(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveCurso`;
    return this.http.post<Response>(url, body);
  }

  updateCurso(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateCurso`;
    return this.http.put<Response>(url, body);
  }

  deleteCurso(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteCurso/${id}`;
    return this.http.delete<Response>(url);
  }

  // Asignaturas
  getAsignaturas(): Observable<Asignatura[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getAsignaturas`;
    return this.http.get<Asignatura[]>(url);
  }

  saveAsignatura(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveAsignatura`;
    return this.http.post<Response>(url, body);
  }

  updateAsignatura(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateAsignatura`;
    return this.http.put<Response>(url, body);
  }

  deleteAsignatura(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteAsignatura/${id}`;
    return this.http.delete<Response>(url);
  }

  // Horarios
  getHorarios(): Observable<Horario[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getHorarios`;
    return this.http.get<Horario[]>(url);
  }

  saveHorario(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveHorario`;
    return this.http.post<Response>(url, body);
  }

  updateHorario(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateHorario`;
    return this.http.put<Response>(url, body);
  }

  deleteHorario(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteHorario/${id}`;
    return this.http.delete<Response>(url);
  }

  // Estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getEstudiantes`;
    return this.http.get<Estudiante[]>(url);
  }

  saveEstudiante(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveEstudiante`;
    return this.http.post<Response>(url, body);
  }

  updateEstudiante(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateEstudiante`;
    return this.http.put<Response>(url, body);
  }

  deleteEstudiante(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteEstudiante/${id}`;
    return this.http.delete<Response>(url);
  }

  // Profesores
  getProfesores(): Observable<Profesor[]> {
    const url = `${this.apiUrlBase}${this.apiUrlContextListAll}/getProfesores`;
    return this.http.get<Profesor[]>(url);
  }

  saveProfesor(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextReg}/saveProfesor`;
    return this.http.post<Response>(url, body);
  }

  updateProfesor(body: object): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextMod}/updateProfesor`;
    return this.http.put<Response>(url, body);
  }

  deleteProfesor(id: number): Observable<Response> {
    const url = `${this.apiUrlBase}${this.apiUrlContextDel}/deleteProfesor/${id}`;
    return this.http.delete<Response>(url);
  }
}
