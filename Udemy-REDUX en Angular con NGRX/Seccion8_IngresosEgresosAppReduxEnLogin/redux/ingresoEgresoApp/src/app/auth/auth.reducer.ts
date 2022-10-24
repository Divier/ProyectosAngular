import { Action, createReducer, on, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unsetUser } from './auth.actions';


export interface State {
  user: Usuario | undefined;
}

const initialState: State = {
  user: undefined
}

export const _authReducer = createReducer(
  initialState,
  on(setUser, (state, props) => ({...state, user: {...props.user}})),
  on(unsetUser, state => ({...state, user: undefined}))
)

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
