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
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.scss']
})
export class DocumentMasterComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  displayedColumns: string[] = ['srno', 'documentType', 'isMandatory', 'action'];
  dataSource: any [] = [];
  documentFrm !: FormGroup;
  totalRows: any;
  pageNo = 1;
  pageSize = 10;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService :ConfigService,    
    private webStorageService:WebStorageService,
    public vs: FormsValidationService,
    private spinner: NgxSpinnerService, private router: Router) { }
  ngOnInit(): void {
    this.defaultForm();
    this.getDocumentList();
  }

  defaultForm() {
    this.documentFrm = this.fb.group({
      documentType: ['',[ Validators.required,Validators.pattern(this.vs.alphabetsWithSpace)]],
      isMandatory: ['', Validators.required]
    })
  }

  getDocumentList() {
    this.apiService.setHttp('get', "DocumentMaster/GetDocumentDetails" + "?pageno=" + this.pageNo + "&pagesize=" + this.pageSize, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          console.log(this.dataSource)
          this.totalRows = res.responseData1.totalCount;
        } else {
          this.dataSource = [];
          this.totalRows = 0;
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  pageChanged(pg: any){
    this.pageNo = pg.pageIndex + 1;
    this.getDocumentList();
  }

  saveUpdate() {
    this.spinner.show();
    const formValue = this.documentFrm.value;
    if (this.documentFrm.invalid) {
      this.spinner.hide();
      return;
    }else{
      var req = {
        "id": 0,
        "documentType": formValue.documentType,
        "isMandatory": formValue.isMandatory == "true" ? true : false,
        // "isDeleted": this.webStorageService.getUserId()
      }
      this.apiService.setHttp('post', "DocumentMaster/SaveDocumentDetails", false, req, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode === "200") {
            this.getDocumentList();
            this.clearAll();
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
            this.spinner.hide();
          } else {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        },
        error: ((error: any) => { this.error.handelError(error.status), this.spinner.hide(); })
      })
    }
  }

  clearAll(){
    this.formGroupDirective.resetForm();
  }
}
