import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store';
import * as fromList from '../../store/save';

@Component({
  selector: 'app-inmueble-nuevo',
  templateUrl: './inmueble-nuevo.component.html',
  styleUrls: ['./inmueble-nuevo.component.scss']
})
export class InmuebleNuevoComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  photoLoaded!: string;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
  }

  registrarInmueble(form: NgForm): void {

      if(form.valid) {
        this.loading$ = this.store.pipe(select(fromList.getLoading));

        const inmuebleCreateRequest : fromList.InmuebleCreateRequest = {
          nombre : form.value.nombre,
          foto : this.photoLoaded,
          precio: Number(form.value.precio),
          direccion : form.value.direccion
        }
        this.store.dispatch(new fromList.Create(inmuebleCreateRequest));
      }
  }

  onFilesChanged(url: any): void {
    if(url){
      console.log(url);

      this.photoLoaded = url;
    }
  }
}
