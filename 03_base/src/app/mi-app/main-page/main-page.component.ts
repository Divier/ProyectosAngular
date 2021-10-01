import { Component } from '@angular/core';
import { Profesor } from '../interfaces/mi-app.interface';
import { MiAppService } from '../services/mi-app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  profesoresDataMP: Profesor[] = [];

  verProfesores(profesores: Profesor[]) {
    console.log("@Output:", profesores);
  }

  constructor(private service: MiAppService) {
    this.service.getProfesoresDataService();
    //this.profesoresDataMP = this.service.profesoresDataService;
    //this.profesoresDataMP = this.service.profesoresData;//Funciona el @Input
  }
}
