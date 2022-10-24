import { createAction, props } from "@ngrx/store";
import { DataUsuario } from '../../models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const cargarUsuariosSuccess = createAction('[Usuarios] Cargar Usuarios Success',
  props<{ usuarios: DataUsuario[] }>()
);

export const cargarUsuariosError = createAction('[Usuarios] Cargar Usuarios Error',
  props<{ error: any }>()
);
