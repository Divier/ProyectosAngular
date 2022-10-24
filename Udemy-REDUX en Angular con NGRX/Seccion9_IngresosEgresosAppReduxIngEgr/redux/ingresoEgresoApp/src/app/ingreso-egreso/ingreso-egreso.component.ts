import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  tipo: string = "ingreso";

  subscription!: Subscription;

  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingEgrService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })

    this.subscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.formGroup.value;
    const ingresoEgreso: IngresoEgreso = {
      descripcion: descripcion,
      monto: monto,
      tipo: this.tipo
    }
    this.ingEgrService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.formGroup.reset();
      this.store.dispatch(stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch( err => {
      this.store.dispatch(stopLoading());
      Swal.fire('Error', err.message, 'error')
    });
  }

}
