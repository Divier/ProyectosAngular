import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { DataUsuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  usuarios: DataUsuario[] = [];

  loading: boolean = false;

  error: any;

  constructor(
    private usuarioService: UsuarioService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    })

    this.store.dispatch( cargarUsuarios() );

    //La siguiente seria la forma tradicional de traer los datos de un servicio
    /*this.usuarioService.getUsers()
      .subscribe(({data}) => {
        this.usuarios = data;
      })*/
  }
}
