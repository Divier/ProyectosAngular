import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColegioComponent } from './administrador/pages/colegio/colegio.component';
import { CursoComponent } from './administrador/pages/curso/curso.component';
import { AsignaturaComponent } from './administrador/pages/asignatura/asignatura.component';
import { HorarioComponent } from './administrador/pages/horario/horario.component';
import { ProfesorComponent } from './administrador/pages/profesor/profesor.component';
import { EstudianteComponent } from './administrador/pages/estudiante/estudiante.component';
import { InicioComponent } from './administrador/pages/inicio/inicio.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
/*
  {
    path: '',
    component: InicioComponent,
    pathMatch: 'full'
  },
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
    redirectTo: ''
  }
  */

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent,
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
