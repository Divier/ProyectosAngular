import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  // Toda esta instruccion debe retornar un Observable
  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuarios),
      tap(data => console.log("Action: ",data)),
      mergeMap(
        () => this.usuarioService.getUsers().pipe(
          tap(data => console.log("Data Service: ",data)),
          map( ({data}) => cargarUsuariosSuccess({ usuarios: data })),
          catchError( err => of( cargarUsuariosError({error: err}) ))
        )
      )
    )
  );
}
