import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './guards/unauth/unauth.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inmueble',
        loadChildren: () => import('./pages/inmueble/inmueble.module').then(m => m.InmuebleModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
        canLoad:[UnauthGuard]
      },
      {
        path: 'static',
        loadChildren: () => import('./pages/static/static.module').then(m => m.StaticModule),
        canLoad:[AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404'
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
