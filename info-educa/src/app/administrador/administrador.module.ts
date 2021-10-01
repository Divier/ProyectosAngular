import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';

import { ColegioComponent } from './pages/colegio/colegio.component';
import { CursoComponent } from './pages/curso/curso.component';
import { AsignaturaComponent } from './pages/asignatura/asignatura.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { MessageComponent } from './components/message.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AdministradorRoutingModule } from './administrador-routing.module';

@NgModule({
  declarations: [
    InicioComponent,
    ColegioComponent,
    CursoComponent,
    AsignaturaComponent,
    HorarioComponent,
    ProfesorComponent,
    EstudianteComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule { }
