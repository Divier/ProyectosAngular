import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarProfesoresComponent } from './pages/consultar-profesores/consultar-profesores.component';
import { ConsultarAsignaturasPorProfesorComponent } from './pages/consultar-asignaturas-por-profesor/consultar-asignaturas-por-profesor.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfesorInputComponent } from './components/profesor-input/profesor-input.component';



@NgModule({
  declarations: [
    ConsultarProfesoresComponent,
    ConsultarAsignaturasPorProfesorComponent,
    InicioComponent,
    ProfesorInputComponent
  ],
  exports: [
    ConsultarProfesoresComponent,
    ConsultarAsignaturasPorProfesorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ]
})
export class ProfesoresModule { }
