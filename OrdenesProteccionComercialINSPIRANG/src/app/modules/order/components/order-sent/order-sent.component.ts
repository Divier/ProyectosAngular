import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-sent',
  templateUrl: './order-sent.component.html',
  providers: [MessageService]
})
export class OrderSentComponent implements OnInit {

  lstOrdSent: Order[] = [
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    }
  ];
  selOrdSent: Order | undefined;

  constructor(
    private opService: OperationsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  downloadFile(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'Archivo Descargado !!!' });
  }
}
