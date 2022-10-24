import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.interface';
import { borrar, crear, editar, toggle, toggleAll, limpiarTodosCompletados } from './todo.actions';


export const estadoInicial: Todo[] = [
  {
    id: new Date().getTime(),
    completado: false,
    texto: 'Tarea Por defecto'
  }
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, props) => [...state, { texto: props.texto, id: new Date().getTime(), completado: false }]),
  on(toggle, (state, props) => {
    return state.map(todos => {
      if (props.id === todos.id) {
        return {
          ...todos,
          completado: !todos.completado
        }
      } else {
        return todos;
      }
    })
  }),
  on(editar, (state, props) => {
    return state.map(todos => {
      if (props.id === todos.id) {
        return {
          ...todos,
          texto: props.texto
        }
      } else {
        return todos;
      }
    })
  }),
  on(borrar, (state, props) => state.filter(todo => todo.id !== props.id)),
  on(toggleAll, (state, props) => {
    return state.map(todos => {
      return {
        ...todos,
        completado: props.toggleAll
      }
    })
  }),
  on(limpiarTodosCompletados, (state) => {
    return state.filter( todo => !todo.completado)
  }),
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
