import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MaterialModule } from '../../modules/material/material.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    StaticRoutingModule,
    MaterialModule
  ]
})
export class StaticModule { }
