import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignaturasResponse } from '../../interfaces/asignaturas-response.interface';
import { ProfesorService } from '../../services/profesor.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-consultar-asignaturas-por-profesor',
  templateUrl: './consultar-asignaturas-por-profesor.component.html'
})
export class ConsultarAsignaturasPorProfesorComponent implements OnInit{

  existError: boolean = false;
  asignaturas: AsignaturasResponse[] = []

  constructor(
    private service: ProfesorService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //this.activatedRoute.params.subscribe( (parametro) => {
    //  this.buscar(parametro.idPrf);
    //})

    // ó
    this.existError = false;
    this.activatedRoute.params
    .pipe(
      switchMap( (parametro) => this.service.consultarAsignaturasByProfesor(parametro.idPrf))
    )
    .subscribe( (resp) => {
      console.log(resp);
      if(resp.length == 0) {
        this.existError = true;
      } else {
        this.asignaturas = resp;
      }
    }, (err) => {
      console.log(err);
      this.existError = true;
    })
  }

  buscar(idPrf: number) {
    this.existError = false;
    this.service.consultarAsignaturasByProfesor(idPrf).subscribe( (resp) => {
      console.log(resp);
      if(resp.length == 0) {
        this.existError = true;
      } else {
        this.asignaturas = resp;
      }
    }, (err) => {
      console.log(err);
      this.existError = true;
    })
  }
}
