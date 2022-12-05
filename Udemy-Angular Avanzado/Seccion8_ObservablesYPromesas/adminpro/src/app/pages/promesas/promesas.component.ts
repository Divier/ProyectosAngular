import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /*const promesa = new Promise( (resolve, reject) => {
      if(false) {
        resolve('Hola Mundo')
      } else {
        reject('Algo salio mal')
      }
    })

    promesa.then((mensaje) => {
      console.log(mensaje);
    }).catch((err) => console.log('Ocurrio un error', err));

    console.log('Fin del Init');*/

    this.getUsuarios()
    .then( usuarios => {
      console.log(usuarios);
    });
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
      .then( response => response.json())
      .then( body => resolve(body.data))
    });
  }
}
