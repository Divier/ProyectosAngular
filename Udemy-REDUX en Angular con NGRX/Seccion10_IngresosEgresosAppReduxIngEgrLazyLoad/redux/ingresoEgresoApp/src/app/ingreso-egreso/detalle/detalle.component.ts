import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];

  subscription!: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService)
  { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresosEgresos').subscribe( ({items}) => {
      this.ingresosEgresos = items;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  borrar(uid?: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then( () => Swal.fire('Borrado', 'Item Borrado', 'success'))
    .catch( err => Swal.fire('Error', err.message, 'error'));
  }
}
