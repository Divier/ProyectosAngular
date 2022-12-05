import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, Event } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo!: string;
  titleSub$!: Subscription;

  constructor(private router: Router) {
    this.titleSub$ = this.getArgumentosRuta()
    .subscribe((data) => {
      this.titulo = data['titulo'];
      document.title = `AdminPro - ${this.titulo}`;
    })
  }

  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event: Event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event) => event.snapshot.firstChild === null),
      map((event) => event.snapshot.data)
    );
  }
}
