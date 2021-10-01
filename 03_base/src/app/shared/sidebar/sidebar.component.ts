import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      a {
        cursor: wait
      }
    `
  ]
})
export class SidebarComponent {

  opciones: string[] = ['Consultar Profesores', 'Consultar Cursos'];

  constructor() {
    if(localStorage.getItem("opciones")) {
      //Para obtener la informacion del LocalStorage
      this.opciones = JSON.parse(localStorage.getItem("opciones")!);
    } else {
      //Para enviar la informacion a guardar en el LocalStorage
      localStorage.setItem("opciones", JSON.stringify(this.opciones));
    }
  }
}
