import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  // Toda esta instruccion debe retornar un Observable
  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuario),
      //tap(data => console.log("Action: ", data)),
      mergeMap(
        (action) => this.usuarioService.getUserById(action.id).pipe(
          //tap(data => console.log("Data Service: ", data)),
          map(user => cargarUsuarioSuccess({ usuario: user })),
          catchError(err => of(cargarUsuarioError({ error: err })))
        )
      )
    )
  );
}
