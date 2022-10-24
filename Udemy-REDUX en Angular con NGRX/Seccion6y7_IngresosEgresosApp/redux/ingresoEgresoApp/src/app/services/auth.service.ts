import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
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
