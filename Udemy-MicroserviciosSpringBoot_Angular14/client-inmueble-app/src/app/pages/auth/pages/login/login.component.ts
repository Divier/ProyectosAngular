import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/store';
import * as fromUser from 'src/app/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void { }

  loginUsuario(form: NgForm): void {
    const userLoginRequest: fromUser.EmailPasswordCredentials = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));
  }
}
