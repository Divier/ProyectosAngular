import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authservice.isAuth()
    .pipe(
      tap( estado => {
        if(!estado) {
          this.router.navigate(['/login'])
        }
      })
    )
  }

}
