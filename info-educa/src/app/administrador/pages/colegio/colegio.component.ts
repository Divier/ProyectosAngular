import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Colegio } from '../../interfaces/colegio.interface';

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.css'],
  providers: [ConfirmationService]
})
export class ColegioComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idCol?: number;
  nombre?: string;
  //Modificar
  idColM?: number;
  nombreM?: string;

  //Datos
  colegios: Colegio[] = [];
  colegio: Colegio | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getColegios();
  }

  private getColegios() {
    this.service.getColegios().subscribe((colegios) => {
      this.colegios = colegios;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getColegios();
    }, 1000);
  }

  saveColegio() {
    const body = {
      'idCol': this.idCol,
      'nombre': this.nombre
    };

    this.service.saveAsignatura(body).subscribe((response) => {
      if (response.code === 0) {
        this.getColegios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editColegio() {
    const body = {
      'idCol': this.idColM,
      'nombre': this.nombreM
    };

    this.service.updateColegio(body).subscribe((response) => {
      if (response.code === 0) {
        this.getColegios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteColegio(colegio: Colegio) {
    this.service.deleteColegio(colegio.idCol).subscribe((response) => {
      if (response.code === 0) {
        this.getColegios();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditColegio(colegio: Colegio) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idColM = colegio.idCol;
    this.nombreM = colegio.nombre;
  }

  preDeleteColegio(event: Event, colegio: Colegio) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion del colegio?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteColegio(colegio);
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
    this.idColM = undefined;
    this.nombreM = undefined;
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
