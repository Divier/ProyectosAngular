import { NgModule } from '@angular/core';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Routes, RouterModule } from '@angular/router';
import { ColegioComponent } from './pages/colegio/colegio.component';
import { CursoComponent } from './pages/curso/curso.component';
import { AsignaturaComponent } from './pages/asignatura/asignatura.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'colegios',
        component: ColegioComponent,
      },
      {
        path: 'cursos',
        component: CursoComponent
      },
      {
        path: 'asignaturas',
        component: AsignaturaComponent
      },
      {
        path: 'horarios',
        component: HorarioComponent
      },
      {
        path: 'profesores',
        component: ProfesorComponent
      },
      {
        path: 'estudiantes',
        component: EstudianteComponent
      },
      {
        path: '**',
        redirectTo: 'colegios'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministradorRoutingModule { }
