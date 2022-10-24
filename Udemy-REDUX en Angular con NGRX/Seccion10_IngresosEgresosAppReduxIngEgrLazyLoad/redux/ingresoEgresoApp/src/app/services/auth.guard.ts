import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

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

  canLoad(): Observable<boolean> {
    return this.authservice.isAuth()
    .pipe(
      tap( estado => {
        if(!estado) {
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    )
  }

}
