import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/configs/config.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.scss']
})
export class DocumentMasterComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  displayedColumns: string[] = ['position', 'sr', 'Mandatory', 'web',];
  dataSource: any;
  documentFrm !: FormGroup;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService :ConfigService,
    private spinner: NgxSpinnerService, private router: Router) { }
  ngOnInit(): void {
    this.defaultForm();
  }

  defaultForm() {
    this.documentFrm = this.fb.group({
      documentType: ['',[ Validators.required,Validators.pattern('^[^\\s\\[\\[`&._@#%*!+"\'\/\\]\\]{}][0-9a-zA-Z&s\\s]+$')]],
      isMandatory: ['', Validators.required]
    })
  }

  getData() {
    this.apiService.setHttp('get', "user-registration/", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  saveUpdate() {
    this.spinner.show();
    const formValue = this.documentFrm.value;
    if (this.documentFrm.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.setHttp('get', "user-registration/" + formValue.userName.trim() + "/" + formValue.passWord.trim(), false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  clearAll(){
    this.formGroupDirective.resetForm();
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, sr: '', Mandatory: '', web: '', },

];
export interface PeriodicElement {
  position: number;
  sr: string;
  Mandatory: string;
  web: string;

}
