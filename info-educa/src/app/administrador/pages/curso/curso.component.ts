import { Component, OnInit } from '@angular/core';
import { Curso } from '../../interfaces/curso.interface';
import { AdministradorService } from '../../services/administrador.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
  providers: [ConfirmationService]
})
export class CursoComponent implements OnInit {

  //Mensaje global
  messageType!: number;
  showMessage: boolean = false;

  //Registrar
  idCur?: number;
  grado?: string;
  salon?: string;
  //Modificar
  idCurM?: number;
  gradoM?: string;
  salonM?: string;

  //Datos
  cursos: Curso[] = [];
  curso: Curso | undefined;

  //Controles
  isDisabledModificar: boolean = true;
  isDisabledRegistrar: boolean = false;
  isSelectedViewModificar: boolean = false;
  isSelectedViewRegistrar: boolean = true;

  constructor(
    private service: AdministradorService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCursos();
  }

  private getCursos() {
    this.service.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
    })
  }

  private loadTable(event: LazyLoadEvent) {
    setTimeout(() => {
      this.getCursos();
    }, 1000);
  }

  saveCurso() {
    const body = {
      'idCur': this.idCur,
      'grado': this.grado,
      'salon': this.salon
    };

    this.service.saveCurso(body).subscribe((response) => {
      if (response.code === 0) {
        this.getCursos();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  editCurso() {
    const body = {
      'idCur': this.idCurM,
      'grado': this.gradoM,
      'salon': this.salonM
    };

    this.service.updateCurso(body).subscribe((response) => {
      if (response.code === 0) {
        this.getCursos();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  deleteCurso(curso: Curso) {
    this.service.deleteCurso(curso.idCur).subscribe((response) => {
      if (response.code === 0) {
        this.getCursos();
        this.defineMessage(response.code);
      }
    }, (err) => {
      console.log(err);
      this.defineMessage(-1);
    })
  }

  preEditCurso(curso: Curso) {
    this.isDisabledModificar = false;
    this.isSelectedViewModificar = true;
    this.isDisabledRegistrar = true;
    this.isSelectedViewRegistrar = false;

    this.idCurM = curso.idCur;
    this.gradoM = curso.grado;
    this.salonM = curso.salon;
  }

  preDeleteCurso(event: Event, curso: Curso) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de proceder con la eliminacion del curso?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCurso(curso);
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
    this.idCurM = undefined;
    this.gradoM = undefined;
    this.salonM = undefined;
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
