import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { filtrosValidos } from '../../filtro/filtro.actions';
import { limpiarTodosCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: filtrosValidos = 'todos' as filtrosValidos;

  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    /*this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length;
    })*/

    this.store.select('filtro').subscribe(filtro => {
      //console.log(filtro);
      this.filtroActual = filtro;
    })

    this.store.select('todos').subscribe(todos => {
      this.pendientes = todos.filter(todo => !todo.completado).length;
    })
  }

  filtrar(filtro: filtrosValidos) {
    this.store.dispatch(actions.setFiltro({ filtro: filtro }))
  }

  limpiarTodosCompletados() {
    this.store.dispatch(limpiarTodosCompletados());
  }
}
