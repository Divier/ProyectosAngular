import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store';
import * as fromUser from 'src/app/store/user';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  private check() : Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState)).pipe(
      filter(state => !state.loading),
      tap( state => {
        if(state.email){
          this.router.navigate(['/']);
        }
      }),
      map(state => !state.email)
    )
  }
}
