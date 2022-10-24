import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  subscription2!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoservice: IngresoEgresoService) { }

  ngOnInit(): void {

    this.subscription = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( valor => {
      this.subscription2 = this.ingresoEgresoservice.initIngresosEgresosListener(valor.user?.uid!)
      .subscribe( ingresoEgreso => {
        this.store.dispatch(setItems({items: ingresoEgreso}))
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription2.unsubscribe();
    this.subscription.unsubscribe();
  }
}
