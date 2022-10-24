import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    .cursor {
      cursor: pointer
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsuario?: string;
  subscription?: Subscription;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('user').subscribe(user => this.nombreUsuario = user.user?.nombre);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logout() {
    this.authservice.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }
}
