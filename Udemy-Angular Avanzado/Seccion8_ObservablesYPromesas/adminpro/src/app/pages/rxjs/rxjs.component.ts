import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs!: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {

    /*this.returnObservable().pipe(
      retry(1)
    )
    .subscribe({
        next: (valor) => console.log(valor),
        error: (err) => console.error(err),
        complete: () => console.info('complete')
    });*/

    this.intervalSubs = this.returnInterval()
    .subscribe(console.log);
  }

  returnObservable(): Observable<number> {

    return new Observable<number>((observer) => {
      let i = -1;
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if(i === 5) {
          observer.complete();
          clearInterval(interval);
        }
        if (i === 2) {
          observer.error('i llego a 2')
        }
      }, 1000);
    })
  }

  returnInterval(): Observable<number> {
    return interval(100)
            .pipe(
              map(valor => valor + 1),
              filter(valor => (valor % 2) == 0 ? true :  false),
              take(10)
            );
  }
}
