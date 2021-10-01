import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { AdministradorService } from '../../services/administrador.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  providers: [ConfirmationService]
})
export class EstudianteComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idEst?: number;
  nombre?: string;
  fechaNacimiento?: Date;
  //Modificar
  idEstM?: number;
  nombreM?: string;
  fechaNacimientoM?: Date;

  //Datos
  estudiantes: Estudiante[] = [];
  estudiante: Estudiante | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  private getEstudiantes() {
    this.service.getEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getEstudiantes();
    }, 1000);
  }

  saveEstudiante() {
    let formattedFechaNacimiento = (moment(this.fechaNacimiento)).format('YYYY-MM-DD');

    const body = {
      'idEst': this.idEst,
      'nombre': this.nombre,
      'fechaNacimiento': formattedFechaNacimiento
    };

    this.service.saveEstudiante(body).subscribe((response) => {
      if (response.code === 0) {
        this.getEstudiantes();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editEstudiante() {
    let formattedFechaNacimiento = (moment(this.fechaNacimientoM)).format('YYYY-MM-DD');

    const body = {
      'idEst': this.idEstM,
      'nombre': this.nombreM,
      'fechaNacimiento': formattedFechaNacimiento
    };

    this.service.updateEstudiante(body).subscribe((response) => {
      if (response.code === 0) {
        this.getEstudiantes();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteEstudiante(estudiante: Estudiante) {
    this.service.deleteEstudiante(estudiante.idEst).subscribe((response) => {
      if (response.code === 0) {
        this.getEstudiantes();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditEstudiante(estudiante: Estudiante) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idEstM = estudiante.idEst;
    this.nombreM = estudiante.nombre;
    this.fechaNacimientoM = moment(estudiante.fechaNacimiento).toDate();
  }

  preDeleteEstudiante(event: Event, estudiante: Estudiante) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion del estudiante?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteEstudiante(estudiante);
      },
      reject: () => { }
    });
  }

  cancelar() {
    this.resetFieldsViewModificar();
    this.isDisabledModificar = true;
    this.isSelectedViewModificar = false;
    this.isDisabledRegistrar = false;
    this.isSelectedViewRegistrar = true;
  }

  private resetFieldsViewModificar() {
    this.idEstM = undefined;
    this.nombreM = undefined;
    this.fechaNacimientoM = undefined;
  }

  private defineMessage(code: number) {
    if (code === 0) {
      this.messageType = code;
    } else if (code === -1) {
      this.messageType = code;
    }
    this.showMessage = true;
  }

  hideMessage(value: boolean) {
    this.showMessage = !value;
  }
}
