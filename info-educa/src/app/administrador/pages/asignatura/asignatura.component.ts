import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { Asignatura } from '../../interfaces/asignatura.interface';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import * as moment from 'moment';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css'],
  providers: [ConfirmationService]
})
export class AsignaturaComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idAsg?: number;
  nombre?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
  //Modificar
  idAsgM?: number;
  nombreM?: string;
  fechaDesdeM?: Date;
  fechaHastaM?: Date;

  //Datos
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAsignaturas();
  }

  private getAsignaturas() {
    this.service.getAsignaturas().subscribe((asignaturas) => {
      this.asignaturas = asignaturas;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getAsignaturas();
    }, 1000);
  }

  saveAsignatura() {
    let formattedFechaDesde = (moment(this.fechaDesde)).format('YYYY-MM-DD HH:mm:ss');
    let formattedFechaHasta = (moment(this.fechaHasta)).format('YYYY-MM-DD HH:mm:ss');

    const body = {
      'idAsg': this.idAsg,
      'nombre': this.nombre,
      'fechaDesde': formattedFechaDesde,
      'fechaHasta': formattedFechaHasta
    };

    this.service.saveAsignatura(body).subscribe((response) => {
      if (response.code === 0) {
        this.getAsignaturas();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editAsignatura() {
    let formattedFechaDesde = (moment(this.fechaDesdeM)).format('YYYY-MM-DD HH:mm:ss');
    let formattedFechaHasta = (moment(this.fechaHastaM)).format('YYYY-MM-DD HH:mm:ss');

    const body = {
      'idAsg': this.idAsgM,
      'nombre': this.nombreM,
      'fechaDesde': formattedFechaDesde,
      'fechaHasta': formattedFechaHasta
    };

    this.service.updateAsignatura(body).subscribe((response) => {
      if (response.code === 0) {
        this.getAsignaturas();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteAsignatura(asignatura: Asignatura) {
    this.service.deleteAsignatura(asignatura.idAsg).subscribe((response) => {
      if (response.code === 0) {
        this.getAsignaturas();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditAsignatura(asignatura: Asignatura) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idAsgM = asignatura.idAsg;
    this.nombreM = asignatura.nombre;
    this.fechaDesdeM = moment(asignatura.fechaDesde).toDate();
    this.fechaHastaM = moment(asignatura.fechaHasta).toDate();
  }

  preDeleteAsignatura(event: Event, asignatura: Asignatura) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion de la asignatura?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAsignatura(asignatura);
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
    this.idAsgM = undefined;
    this.nombreM = undefined;
    this.fechaDesdeM = undefined;
    this.fechaHastaM = undefined;
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
