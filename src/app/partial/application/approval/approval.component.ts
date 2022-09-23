import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  remarkTableColumns: string[] = ['srno', 'approverTypeName', 'remark', 'applicationStatusText'];
  documentTableColums: string[] = ['srno', 'documentName', 'documentNo', 'view'];
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  remarkTable: any;
  applicationId!: number;
  applicationDetails: any;
  documentTable: any;
  remarkDetails: any;
  documentFrm: any;
  userDocumentTable: any;
  documentArray: any[] = [];
  isDocumentUpload: boolean = false;
  hideApproveButton:boolean =false;
  hideDocumentUpload: boolean = false;
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    public webStorageService: WebStorageService,
    public vs: FormsValidationService,
    public dialog: MatDialog,
    public fileUploadService: FileUploadService,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.defaultForm();
    this.applicationId = this.route.snapshot.params['id'];
    this.getRemarksDeailsById();
    this.saveDocument()
  }
  defaultForm() {
    this.documentFrm = this.fb.group({
      "documentName": ['', Validators.required],
      "documentNo": ['', Validators.required]
    })
  }

  getRemarksDeailsById() {
    this.spinner.show()
    this.apiService.setHttp('get', "CoalApplication/GetApplicationApprovedStatus?applicationId=" + this.applicationId, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.remarkDetails = res.responseData;
          this.remarkTable = new MatTableDataSource(res.responseData);
          this.hideApproveRejectBtn()
          this.getApplicationDetailsById();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          if (res.statusCode != "404") {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }

  getApplicationDetailsById() {
    this.spinner.show()
    this.apiService.setHttp('get', "CoalApplication/GetCoalApplicationDetailsUsingPAN?applicationId=" + this.applicationId, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.applicationDetails = res.responseData;
         this.remarkDetails.forEach((ele:any) => { ele.coalApplicationDocuments.length?ele.coalApplicationDocuments.forEach((element:any ) =>{this.applicationDetails?.coalApplicationDocuments.push(element) }) :' ' });
          this.documentTable = new MatTableDataSource(this.applicationDetails?.coalApplicationDocuments);
          this.spinner.hide();
        } else {
          this.spinner.hide();
          if (res.statusCode != "404") {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }

  approveRejectOrApplication(flag: boolean) {
    let obj: any = ConfigService.dialogObj;
    obj['p1'] = flag ? 'Are you sure you want to approve?' : 'Are you sure you want to reject ?';
    obj['cardTitle'] = flag ? 'Application  Approve' : 'Application  Reject';
    obj['successBtnText'] = flag ? 'Approve' : 'Reject';
    obj['cancelBtnText'] = 'Cancel';
    obj['inputType'] = true;
    const dialog = this.dialog.open(ConfirmationComponent, {
      width: this.configService.dialogBoxWidth[0],
      data: obj,
      disableClose: this.configService.disableCloseBtnFlag,
    })

    dialog.afterClosed().subscribe(res => {
      this.remarkDetails
      if (res.flag == 'Yes') {
        let sunUserId = this.webStorageService.getSubUserType();
        let obj = {
          "id":  sunUserId == 2 ? this.remarkDetails[0].id : this.remarkDetails[1].id ,
          "applicationId": this.remarkDetails[0].applicationId,
          "approverLevel": this.webStorageService.getSubUserType(),
          "approverId": this.webStorageService.getUserId(),
          "approverTypeName": "",
          "applicationStatus": flag ? 1 : 2,
          "applicationStatusText": "",
          "remark": res?.remark,
          "coalApplicationDocuments": this.documentArray ? this.documentArray : null
        }
        this.apiService.setHttp('put', "CoalApplication/UpdateApplicationStatus", false, obj, false, 'WBMiningService');
        this.apiService.getHttp().subscribe({
          next: (responseData: any) => {
            if (responseData.statusCode == 200) {
              this.getRemarksDeailsById()
              this.commonMethod.matSnackBar(responseData.statusMessage, 0);
            } else {
              this.commonMethod.checkDataType(responseData.statusMessage) == false ? this.error.handelError(responseData.statusCode) : this.commonMethod.matSnackBar(responseData.statusMessage, 1);
            }
          },
          error: ((error: any) => { this.error.handelError(error.status) })
        });
      }
    })
  }




  documentUpload(event: any) {
    let formValue = this.documentFrm.value;
    if (this.documentFrm.invalid) {
      this.commonMethod.matSnackBar("Please Enter Document Name or No", 1);
      return;
    }
    this.spinner.show();
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, 0, formValue.documentName, "png,jpg,jpeg,pdf", 5, 5000)
    documentUrl.subscribe({
      next: (ele: any) => {
        this.isDocumentUpload = true;
        this.spinner.hide();
        documentUrlUploaed = ele.responseData.documentWebURL;
        if (documentUrlUploaed != null) {
          let obj = {
            "documentTypeId": 0,
            "documentName": formValue.documentName,
            "documentNo": formValue.documentNo,
            "documentPath": documentUrlUploaed
          }
          this.documentArray.push(obj);
          this.formGroupDirective.resetForm();
        }
      },
    });
    this.spinner.hide();
  }

  saveDocument() {
    this.isDocumentUpload = false;
    this.userDocumentTable = new MatTableDataSource(this.documentArray);
  }

  deleteDocument(index: number) {
    this.documentArray.splice(index, 1);
    this.saveDocument();
  }


  hideApproveRejectBtn(){
    let sunUserId = this.webStorageService.getSubUserType();
    if(sunUserId == 2)    {
      this.remarkDetails[0].applicationStatus == 1  || this.remarkDetails[0].applicationStatus == 2 ? (this.hideApproveButton = false,this.hideDocumentUpload = false): (this.hideApproveButton = true ,this.hideDocumentUpload = true);
    }else if(sunUserId == 3){
      this.remarkDetails[1].applicationStatus == 1  || this.remarkDetails[1].applicationStatus == 2 ? this.hideApproveButton = false: this.hideApproveButton = true;
    }else {
      this.hideApproveButton == false;
    }

  }
}
