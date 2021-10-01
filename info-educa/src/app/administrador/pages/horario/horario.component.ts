import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Horario } from '../../interfaces/horario.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
  providers: [ConfirmationService]
})
export class HorarioComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idHor?: number;
  dia?: string;
  hora?: Date;
  //Modificar
  idHorM?: number;
  diaM?: string;
  horaM?: Date;

  //Datos
  horarios: Horario[] = [];
  horario: Horario | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getHorarios();
  }

  private getHorarios() {
    this.service.getHorarios().subscribe((horarios) => {
      this.horarios = horarios;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getHorarios();
    }, 1000);
  }

  saveHorario() {
    let formattedHora = (moment(this.hora)).format('HH:mm:ss');
    const body = {
      'idHor': this.idHor,
      'dia': this.dia,
      'hora': formattedHora
    };

    this.service.saveHorario(body).subscribe((response) => {
      if (response.code === 0) {
        this.getHorarios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editHorario() {
    let formattedHora = (moment(this.horaM)).format('HH:mm:ss');
    const body = {
      'idHor': this.idHorM,
      'dia': this.diaM,
      'hora': formattedHora
    };

    this.service.updateHorario(body).subscribe((response) => {
      if (response.code === 0) {
        this.getHorarios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteHorario(horario: Horario) {
    this.service.deleteHorario(horario.idHor).subscribe((response) => {
      if (response.code === 0) {
        this.getHorarios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditHorario(horario: Horario) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idHorM = horario.idHor;
    this.diaM = horario.dia;
    this.horaM = moment(horario.hora).toDate();
  }

  preDeleteHorario(event: Event, horario: Horario) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion del horario?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteHorario(horario);
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
    this.idHorM = undefined;
    this.diaM = undefined;
    this.horaM = undefined;
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
