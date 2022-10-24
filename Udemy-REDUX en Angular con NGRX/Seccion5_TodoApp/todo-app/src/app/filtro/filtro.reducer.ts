import { Action, createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';


export const estadoInicial: filtrosValidos = 'todos' as filtrosValidos;

const _filtroReducer = createReducer(
  estadoInicial,
  on(setFiltro, (state, props) => props.filtro)
);

export function filtroReducer(state: filtrosValidos | undefined, action: Action) {
  return _filtroReducer(state, action);
}
