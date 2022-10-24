import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import * as actions from './contador/contador.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  contador!: number;

  constructor(private store: Store<AppState>) {
    //this.contador = 10;
  }

  ngOnInit(): void {
    /*this.store.subscribe( state => {
      console.log(state);
      this.contador = state.contador;
    })*/
    this.store.select('contador').subscribe( contador => {
      console.log(contador);
      this.contador = contador;
    })
  }

  incrementar(valor: number) {
    //this.contador += valor;
    this.store.dispatch( actions.incrementar() );
  }

  decrementar(valor: number) {
    //this.contador -= valor;
    this.store.dispatch( actions.decrementar() );
  }
}
