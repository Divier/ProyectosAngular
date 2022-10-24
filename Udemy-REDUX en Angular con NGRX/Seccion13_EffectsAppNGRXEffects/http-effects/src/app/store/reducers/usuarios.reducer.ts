
import { Action, createReducer, on } from "@ngrx/store";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';
import { DataUsuario } from '../../models/usuario.model';

export interface UsuariosState {
  users: DataUsuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
}

const _usuariosReducer = createReducer(initialState,
  on(cargarUsuarios, state => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...usuarios]
  })),
  on(cargarUsuariosError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message
    }
  })),
);

export function usuariosReducer(state: UsuariosState | undefined, action: Action) {
  return _usuariosReducer(state, action);
}
