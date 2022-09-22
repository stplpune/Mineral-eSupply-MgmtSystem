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
  documentArray: any[] =[];
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    private webStorageService: WebStorageService,
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
      "documentName": ['',Validators.required],
      "documentNo": ['',Validators.required]
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

  approveRejectApp(flag: boolean) {
    console.log(this.remarkDetails);

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
      if (res.flag == 'Yes') {
        let obj = {
          "id": 0,
          "applicationId": 0,
          "approverId": 0,
          "approverTypeName": "string",
          "applicationStatus": flag ? 1 : 2,
          "applicationStatusText": "",
          "remark": res.remark
        }
        this.apiService.setHttp('put', "UserRegistration/BlockUnblockUser", false, obj, false, 'WBMiningService');
        this.apiService.getHttp().subscribe({
          next: (responseData: any) => {
            if (responseData.statusCode == 200) {
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
      this.commonMethod.matSnackBar("Please Enter Document Name or No",1);
      return;
    }
    this.spinner.show();
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, 0,formValue.documentName, "png,jpg,jpeg,pdf", 5, 5000)
    documentUrl.subscribe({
      next: (ele: any) => {
        this.spinner.hide();
        documentUrlUploaed = ele.responseData.documentWebURL;
        if (documentUrlUploaed != null) {
          let obj = {
            "documentTypeId": '',
            "documentName": formValue.documentName,
            "documentNo": formValue.documentNo,
            "documentPath": documentUrlUploaed
          }

          this.documentArray.push(obj);
          // this.checkUniqueData(obj, documentTypeId);
          console.log(this.documentArray);
        }
      },
    });
    this.spinner.hide();

  }

  saveDocument() {
    this.userDocumentTable = new MatTableDataSource(this.documentArray);
  }
}
