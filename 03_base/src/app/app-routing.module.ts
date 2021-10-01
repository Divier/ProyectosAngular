import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsultarProfesoresComponent } from './profesores/pages/consultar-profesores/consultar-profesores.component';
import { ConsultarAsignaturasPorProfesorComponent } from './profesores/pages/consultar-asignaturas-por-profesor/consultar-asignaturas-por-profesor.component';
import { InicioComponent } from './profesores/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    pathMatch:'full'
  },
  {
    path: 'profesores',
    component: ConsultarProfesoresComponent,
  },
  {
    path: 'asignaturasxprofesor/:idPrf',
    component: ConsultarAsignaturasPorProfesorComponent,
  },
  {
    path:'**',
    redirectTo:''
  }
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
