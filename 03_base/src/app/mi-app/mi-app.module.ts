import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { SharedModule } from '../shared/shared.module';
import { CursosComponent } from './cursos/cursos.component';
import { MiAppService } from './services/mi-app.service';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ProfesoresComponent,
    CursosComponent,
    AsignaturasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    MainPageComponent
  ],
  providers:[
    MiAppService
  ]
})
export class MiAppModule { }
