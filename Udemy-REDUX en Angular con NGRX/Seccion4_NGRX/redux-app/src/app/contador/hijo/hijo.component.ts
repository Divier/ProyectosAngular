import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit {

  contador! : number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('contador').subscribe( contador => this.contador = contador);
  }

  multiplicar(valor: number) {
    //this.contador *= valor;
    //this.cambioContador.emit(this.contador);

    this.store.dispatch(actions.multiplicar({numero:valor}));
  }

  dividir(valor: number) {
    //this.contador /= valor;
    //this.cambioContador.emit(this.contador);
    this.store.dispatch(actions.dividir({numero:valor}));
  }
}
