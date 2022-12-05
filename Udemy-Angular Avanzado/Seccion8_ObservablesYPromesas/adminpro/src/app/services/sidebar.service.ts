import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'DashBoard',
      icono: 'mdi madi-guage',
      submenu: [
        {
        titulo: 'Main', url: '/',
        },
        {
          titulo: 'ProgressBar', url: 'progress'
        },
        {
          titulo: 'Graficas', url: 'grafica1'
        },
        {
          titulo: 'Promesas', url: 'promesas'
        },
        {
          titulo: 'RxJS', url: 'rxjs'
        }
      ]
    }
  ]

  constructor() { }
}
