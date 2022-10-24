import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from './services/auth.guard';


const routes: Route[] = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  /*{
    path:'',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate:[ AuthGuard ]
  },*/
  {
    path: '',
    loadChildren: () => import("./ingreso-egreso/ingreso-egreso.module").then(m => m.IngresoEgresoModule),
    canLoad: [AuthGuard] //Al ingresar a este path impide que se cargue el modulo
    //canActivate: [AuthGuard] //Al ingresar a este path se carga el modulo asi no ingrese al path
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
