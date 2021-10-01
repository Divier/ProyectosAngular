import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../interfaces/profesor.interface';
import { AdministradorService } from '../../services/administrador.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  providers: [ConfirmationService]
})
export class ProfesorComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idPrf?: number;
  nombre?: string;
  salario?: number;
  //Modificar
  idPrfM?: number;
  nombreM?: string;
  salarioM?: number;

  //Datos
  profesores: Profesor[] = [];
  profesor: Profesor | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getProfesores();
  }

  private getProfesores() {
    this.service.getProfesores().subscribe((profesores) => {
      this.profesores = profesores;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getProfesores();
    }, 1000);
  }

  saveProfesor() {
    const body = {
      'idPrf': this.idPrf,
      'nombre': this.nombre,
      'salario': this.salario
    };

    this.service.saveProfesor(body).subscribe((response) => {
      if (response.code === 0) {
        this.getProfesores();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editProfesor() {
    const body = {
      'idPrf': this.idPrfM,
      'nombre': this.nombreM,
      'salario': this.salarioM
    };

    this.service.updateProfesor(body).subscribe((response) => {
      if (response.code === 0) {
        this.getProfesores();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteProfesor(profesor: Profesor) {
    this.service.deleteProfesor(profesor.idPrf).subscribe((response) => {
      if (response.code === 0) {
        this.getProfesores();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditProfesor(profesor: Profesor) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idPrfM = profesor.idPrf;
    this.nombreM = profesor.nombre;
    this.salarioM = profesor.salario;
  }

  preDeleteProfesor(event: Event, profesor: Profesor) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion del profesor?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProfesor(profesor);
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
    this.idPrfM = undefined;
    this.nombreM = undefined;
    this.salarioM = undefined;
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
