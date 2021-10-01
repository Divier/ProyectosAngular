import { Component } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { ProfesoresResponse } from '../../interfaces/profesores-response.interface';

@Component({
  selector: 'app-consultar-profesores',
  templateUrl: './consultar-profesores.component.html'
})
export class ConsultarProfesoresComponent {

  existError: boolean = false;
  profesores: ProfesoresResponse[] = [];
  estilo: string = '';

  constructor(private service: ProfesorService) { }

  buscar(idPrf: number) {
    this.service.consultarProfesores().subscribe( resp => {
      console.log(resp);
      if(resp.length == 0) {
        this.existError = true;
      } else {
        this.profesores = resp;
      }
    }, (err) => {
      console.log(err);
      this.existError = true;
    })
  }

  changeStyle(event: MouseEvent): string {
    if(event.type == 'mousedown') {
      this.estilo = "btn btn-primary";
    }
    return this.estilo;
  }

}
