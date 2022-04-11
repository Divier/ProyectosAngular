import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  uploadFile(fileUpload: FileUpload) {
    const formData:FormData = new FormData();
    formData.append("file", fileUpload._files[0]);
    return this.http.post("http://localhost:8080/uploadFile", formData)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  listFiles() {
    const url="http://localhost:8080/downloadFile/";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",1); //VERY IMPORTANT
    return this.http.get(url,{params:queryParams});
  }
}
