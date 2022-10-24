import { Action, createReducer, on } from "@ngrx/store";
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unsetItems } from "./ingreso-egreso.actions";
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: State
}

const initialState: State = {
  items: []
}

export const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, props) => ({...state, items : [...props.items]})),
  on(unsetItems, state => ({...state, items: []}))
)

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
  return _ingresoEgresoReducer(state, action);
}
