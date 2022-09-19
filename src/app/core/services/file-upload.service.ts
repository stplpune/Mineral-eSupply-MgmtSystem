import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CallApiService } from './call-api.service';
import { CommonMethodsService } from './common-methods.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private apiService: CallApiService, private spinner: NgxSpinnerService, private error: ErrorHandlerService, private commonService: CommonMethodsService) { }

  uploadDocuments(event: any, folderName?: any, allowedDocTypes?: any, _minsize?: any, maxsize?: any) {
    return new Observable(obj => {
      const selResult = event.target.value.split('.');
      const docExt = selResult.pop();
      docExt.toLowerCase();
      if (allowedDocTypes.match(docExt)) {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          if ((file.size / 1048576) > maxsize) {
            obj.error("Required file size should be less than " + maxsize + " MB.");
          }
          else {
            const reader: any = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              formData.append('FolderName', folderName);
              formData.append('DocumentType', docExt);
              formData.append('UploadDocPath', file);
              this.apiService.setHttp('post', 'document/UploadFile', false, formData, false, 'masterUrl');
              this.apiService.getHttp().subscribe({
                next: (res: any) => {
                  this.spinner.hide();
                  if (res.statusCode === "200") {
                    obj.next(res);
                  }
                  else {
                    this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
                  }
                },
                error: ((error: any) => {
                  this.error.handelError(error.status);
                })
              })
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }
      else {
        obj.next('error');
        obj.error("Only " + allowedDocTypes + " file format allowed.");   
        this.commonService.matSnackBar('Only Supported file Types... pdf, jpg, png, jpeg', 1)
      }
    })
  }
}
