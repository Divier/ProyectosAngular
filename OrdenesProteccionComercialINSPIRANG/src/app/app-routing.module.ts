import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    component: LoginComponent
  },
  /*{
    path: 'cargue',
    loadChildren: () => import('./cargue/cargue.module').then(m => m.CargueModule)
  },*/
  {
    path: '**',
    redirectTo: 'login'
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
