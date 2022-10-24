import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { DataUsuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  usuarios: DataUsuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsers()
    .subscribe(({ data }) => {
      this.usuarios = data;
      console.log(this.usuarios);

    })
  }

}
