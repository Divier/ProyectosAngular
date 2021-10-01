import { Component, ElementRef, ViewChild } from '@angular/core';
import { Profesor } from '../interfaces/mi-app.interface';
import { MiAppService } from '../services/mi-app.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent {

  profesores: Profesor[] = [];

  @ViewChild('txtBC') txtBC!: ElementRef;

  constructor(private service : MiAppService) {
    console.log("Componente Cursos");
  }

  buscar() {
    const valor = this.txtBC.nativeElement.value;
    console.log(valor);
    this.txtBC.nativeElement.value = '';
    //this.service.getProfesoresDataService();
    //this.profesores = this.service.profesoresDataService;
  }
}
