import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { OperationsService } from '../../services/operations.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-load-order',
  templateUrl: './load-order.component.html',
  providers: [MessageService]
})
export class LoadOrderComponent implements OnInit {

  fileUpload!: FileUpload | undefined;
  file: File | undefined;
  fileName!: string;

  constructor(
    private opService: OperationsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  uploadHandler(fileUpload: FileUpload) {
    this.fileUpload = fileUpload;
    if (this.fileUpload) {
      if (this.validateFileUpload()) {
        this.fileName = this.fileUpload._files[0].name;
      } else {
        this.removeFile();
      }
    }
  }

  removeFile(): void {
    this.fileUpload?.clear();
    this.fileUpload = undefined;
    this.fileName = '';
  }

  sendFile(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'Archivo Enviado !!!' });
    this.opService.uploadFile(this.fileUpload!);
  }

  validateFileUpload(): boolean {
    const fileSize: number = this.fileUpload!._files[0].size;
    const fileType: string = this.fileUpload!._files[0].type;
    const fileTypesValid: string[] = [
      'text/comma-separated-values',
      'text/csv',
      'application/csv',
      'application/excel',
      'application/vnd.ms-excel',
      'application/vnd.msexcel'];
    if (fileSize > 10485760) {
      this.messageService.add({ severity: 'info', summary: '', detail: 'El archivo seleccionado supera el tamaño permitido' });
      return false;
    }
    if (!fileTypesValid.includes(fileType)) {
      this.messageService.add({ severity: 'info', summary: '', detail: 'El archivo seleccionado no es del tipo permitido' });
      return false;
    }
    return true;
  }
}
