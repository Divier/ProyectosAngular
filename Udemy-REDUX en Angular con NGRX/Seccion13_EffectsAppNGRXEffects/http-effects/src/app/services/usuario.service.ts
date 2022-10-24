import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, DataUsuario } from '../models/usuario.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private url = 'https://reqres.in/api1111111111';
  private url = 'https://reqres.in/api';

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<Usuario>(`${this.url}/users?page=1&delay=3`);
  }

  getUserById(id: string) {
    return this.http.get<Usuario>(`${this.url}/users/${id}`)
      .pipe(
        map(resp => (resp.data) as unknown as DataUsuario),
      )
  }
}
