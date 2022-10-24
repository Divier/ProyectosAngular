import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromActions from './save.actions';
import { InmuebleCreateRequest, InmuebleResponse } from './save.models';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';

type Action = fromActions.All;

@Injectable()
export class SaveEffects {

  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private notification: NotificationService
  ) { }

  read: Observable<Action> = createEffect( () =>
      this.actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap( () =>
          this.httpClient.get<InmuebleResponse[]>(`${environment.url}gateway/inmueble`)
          .pipe(
            delay(1000),
            map((inmuebles: InmuebleResponse[]) => new fromActions.ReadSuccess(inmuebles) ),
            catchError(err => of(new fromActions.ReadError(err.message)))
          )
        )
      )
  );

  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.inmueble),
      switchMap((request: InmuebleCreateRequest) =>
        this.httpClient.post<InmuebleResponse>(`${environment.url}gateway/inmueble`, request)
          .pipe(
            delay(1000),
            tap((response: InmuebleResponse) => {
              this.router.navigate(['inmueble/list']);
            }),
            map((inmueble: InmuebleResponse) => new fromActions.CreateSuccess(inmueble)),
            catchError(err => {
              this.notification.error(`Errores guardando el inmueble: ${err.message}`);
              return of(new fromActions.CreateError(err.message));
            })
          )
      )
    )
  );
}
