import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    .cursor {
      cursor: pointer
    }
  `]
})
export class SidebarComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authservice.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }
}
