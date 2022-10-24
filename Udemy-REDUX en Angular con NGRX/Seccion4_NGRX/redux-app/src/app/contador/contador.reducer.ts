import { createReducer, on, Action } from '@ngrx/store';
import { incrementar, decrementar, reset, multiplicar, dividir } from './contador.actions';

export const initialState = 10;

export const contadorReducer = createReducer(
  initialState,
  on(incrementar, (state) => state + 1),
  on(decrementar, (state) => state - 1),
  on(multiplicar, ( state, props ) => state * props.numero ),
  on(dividir, ( state, props ) => state / props.numero ),
  on(reset, (state) => 0)
);
