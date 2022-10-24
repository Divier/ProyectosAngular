import { createAction, props } from "@ngrx/store";
import { DataUsuario } from '../../models/usuario.model';

export const cargarUsuario = createAction('[Usuario] Cargar Usuario',
  props<{ id: string }>()
);

export const cargarUsuarioSuccess = createAction('[Usuario] Cargar Usuario Success',
  props<{ usuario: DataUsuario }>()
);

export const cargarUsuarioError = createAction('[Usuario] Cargar Usuario Error',
  props<{ error: any }>()
);
