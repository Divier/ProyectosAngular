import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  cargando: boolean = false;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.subscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
      console.log('Cargando Subscribe!!!');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loginUsuario() {
    if(this.formGroup.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    /*Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });*/

    const {correo, password} = this.formGroup.value;
    this.authService.loginUsuario(correo, password)
    .then(credenciales => {
      console.log(credenciales);
      //Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
    );
  }
}
