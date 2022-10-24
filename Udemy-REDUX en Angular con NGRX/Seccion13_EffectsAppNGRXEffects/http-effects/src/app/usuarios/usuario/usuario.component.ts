import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuario } from '../../store/actions';
import { Subscription } from 'rxjs';
import { DataUsuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  subscription?: Subscription;
  usuario?: DataUsuario;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe(({ user }) => {
      this.usuario = user;
    })

    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id: id }));
    })
  }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe();
  }
}
