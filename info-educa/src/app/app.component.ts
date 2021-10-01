import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem, SelectItemGroup } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'info-educa';
  viewSideBar: boolean = false;
  groupOptions!: SelectItemGroup[];
  options!: SelectItem[];
  selected!: SelectItem;

  constructor(
    private configPNG: PrimeNGConfig,
    private translateService: TranslateService,
    private router: Router) {

    this.translateService.use('es');
    this.translateService.get('primeng').subscribe(res => this.configPNG.setTranslation(res));
  }

  ngOnInit() {
    this.configPNG.ripple = true;
    this.translateService.setDefaultLang('es');

    this.groupOptions = [
      {
        label: 'Administracion',
        value: 'administrador',
        items: [
          { label: 'Colegios', value: './administrador/colegios' },
          { label: 'Cursos', value: './administrador/cursos' },
          { label: 'Asignaturas', value: './administrador/asignaturas' },
          { label: 'Horarios', value: './administrador/horarios' },
          { label: 'Profesores', value: './administrador/profesores' },
          { label: 'Estudiantes', value: './administrador/estudiantes' }
        ]
      },
      {
        label: 'Formalizaciones',
        value: 'administrador',
        items: [
        ]
      }
    ];

    this.options = [
      { label: 'Colegios', value: './administrador/colegios' },
      { label: 'Cursos', value: './administrador/cursos' },
      { label: 'Asignaturas', value: './administrador/asignaturas' },
      { label: 'Horarios', value: './administrador/horarios' },
      { label: 'Profesores', value: './administrador/profesores' },
      { label: 'Estudiantes', value: './administrador/estudiantes' }

    ];
  }

  nav() {
    this.router.navigate([this.selected]);
    this.viewSideBar = false;
  }
}
