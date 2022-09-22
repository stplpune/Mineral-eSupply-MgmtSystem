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
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.scss']
})
export class DocumentMasterComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  displayedColumns: string[] = ['srno', 'documentType', 'isMandatory', 'action'];
  dataSource: any [] = [];
  documentFrm !: FormGroup;
  totalRows: any;
  pageNo = 1;
  pageSize = 10;
  isEdit:boolean = false;
  updateId: any;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService :ConfigService,    
    private webStorageService:WebStorageService,
    public vs: FormsValidationService,
    public dialog: MatDialog,
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
    this.clearAll();
  }

  saveUpdate(formData: any, action: any) {
    var req= {
      "id": this.isEdit == true ? this.updateId : action == 'add_update' ? 0 : formData.id,
      "documentType": formData.documentType,
      "isMandatory": formData.isMandatory == "true" ? true : false,
      "isDeleted": action == 'add_update' ? false : true
    };
    if(action == 'add_update'){
      if (this.documentFrm.invalid) {
        return;
      }else{
        this.onSubmit(req);
      }
    }else{
      let obj:any = ConfigService.dialogObj;
    
      obj['p1'] = 'Are you sure you want to delete this record?';
      obj['cardTitle'] = 'Delete';
      obj['successBtnText'] = 'Delete';
      obj['cancelBtnText'] =  'Cancel';

      const dialog = this.dialog.open(ConfirmationComponent, {
        width:this.configService.dialogBoxWidth[0],
        data: obj,
        disableClose: this.configService.disableCloseBtnFlag,
      })
      dialog.afterClosed().subscribe(res => {
        if(res == "Yes"){
          this.onSubmit(req);
        }else{

        }
      })
    }
  }

  onSubmit(rq: any){    
    this.spinner.show();
    this.pageNo = 1;
    this.paginator.pageIndex = 0;
    this.apiService.setHttp('post', "DocumentMaster/SaveDocumentDetails", false, rq, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          this.getDocumentList();
          this.clearAll();
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status), this.spinner.hide(); })
    })
  }

  clearAll(){
    this.formGroupDirective.resetForm();
    this.isEdit = false;
  }

  editDocument(row: any){
    this.isEdit = true;
    this.updateId = row.id;
    this.documentFrm.patchValue({
      documentType: row.documentType,
      isMandatory: row.isMandatory == true ? "true" : "false"
    })
  }
}
