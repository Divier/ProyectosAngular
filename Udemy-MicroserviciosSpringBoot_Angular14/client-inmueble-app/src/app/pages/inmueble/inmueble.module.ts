import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleRoutingModule } from './inmueble-routing.module';
import { InmuebleNuevoComponent } from './pages/inmueble-nuevo/inmueble-nuevo.component';
import { InmuebleListComponent } from './pages/inmueble-list/inmueble-list.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '../../shared/indicators/spinner/spinner.module';
import { EntityPhotoModule } from '../../shared/layouts/entity-photo/entity-photo.module';
import { PopupsModule } from '../../shared/popups/popups.module';
import { MaterialModule } from '../../modules/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';


@NgModule({
  declarations: [
    InmuebleNuevoComponent,
    InmuebleListComponent
  ],
  imports: [
    CommonModule,
    InmuebleRoutingModule,
    FormsModule,
    FlexLayoutModule,
    SpinnerModule,
    EntityPhotoModule,
    PopupsModule,
    MaterialModule,
    StoreModule.forFeature('inmueble', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class InmuebleModule { }
