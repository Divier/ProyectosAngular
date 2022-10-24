import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../auth/auth.actions';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription?: Subscription;

  private _user?: Usuario;

  get user() {
    return {...this._user};
  }

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      //console.log(fuser);
      if(fuser) {
        this.userSubscription = this.fs.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (fsUser: any) => {
          //console.log({fsUser});
          const user: Usuario = {
            uid: fsUser.uid,
            nombre: fsUser.nombre,
            email: fsUser.email,
          }
          this._user = user;
          this.store.dispatch( setUser({user: user}));
        })
      } else {
        this._user = undefined;
        this.userSubscription?.unsubscribe();
        this.store.dispatch( unsetUser());
        this.store.dispatch( unsetItems());
      }
    })
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then(fbUser => {
        const newUser: Usuario = {
          uid: fbUser.user?.uid,
          nombre: nombre,
          email: correo
        }
        return this.fs.doc(`${fbUser.user?.uid}/usuario`).set(newUser);
      });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    )
  }
}
