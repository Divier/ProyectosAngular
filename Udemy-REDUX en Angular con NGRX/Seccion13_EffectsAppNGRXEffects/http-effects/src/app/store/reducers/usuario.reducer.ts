
import { Action, createReducer, on } from "@ngrx/store";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';
import { DataUsuario } from '../../models/usuario.model';

export interface UsuarioState {
  id: string;
  user: DataUsuario | undefined;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: UsuarioState = {
  id: '',
  user: undefined,
  loaded: false,
  loading: false,
  error: null
}

const _usuarioReducer = createReducer(initialState,
  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id: id
  })
  ),
  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario }
  })),
  on(cargarUsuarioError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message
    }
  }))
);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
  return _usuarioReducer(state, action);
}
