import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmuebleNuevoComponent } from './pages/inmueble-nuevo/inmueble-nuevo.component';
import { InmuebleListComponent } from './pages/inmueble-list/inmueble-list.component';
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nuevo',
        component: InmuebleNuevoComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'list',
        component: InmuebleListComponent,
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
