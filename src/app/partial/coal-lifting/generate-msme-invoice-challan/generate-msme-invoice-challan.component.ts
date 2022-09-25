import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-generate-msme-invoice-challan',
  templateUrl: './generate-msme-invoice-challan.component.html',
  styleUrls: ['./generate-msme-invoice-challan.component.scss']
})
export class GenerateMsmeInvoiceChallanComponent implements OnInit {
  filterForm!: FormGroup;
  dataSource: any;
  totalRows!: number;
  pageNo: number = 1;
  maxDate = new Date();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns = ['srno', 'invoiceDate', 'salesOrderNo', 'deliveryOrderNo', 'consumerName', 'collieryName', 'vechicleRegNo', 'liftingQty', 'loadingSlipId', 'invoiceDocument','status','action']
  constructor(private spinner: NgxSpinnerService, public apiService: CallApiService, private fb: FormBuilder, public dialog: MatDialog, private webStorageService:WebStorageService,
    private commonMethod: CommonMethodsService, private error: ErrorHandlerService, private datePipe: DatePipe, private configService: ConfigService) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getMSMEData();
  }

  defaultForm() {
    this.filterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      searchValue: ['']
    })
  }

  getMSMEData() {
    this.spinner.show();
    let formData = this.filterForm.value;
    let fromDate: any = this.datePipe.transform(formData.fromDate, 'dd-MM-yyyy');
    let toDate: any = this.datePipe.transform(formData.toDate, 'dd-MM-yyyy');
    let str = fromDate && toDate ? '&fromDate=' + fromDate + '&toDate=' + toDate : '';
    // this.apiService.setHttp('get', "MSMEInvoice/GetMSMEInvoice + "&pageNo=" + this.pageSize + "&pageSize=10", false, false, false, 'WBMiningService');
    this.apiService.setHttp('get', "MSMEInvoice/GetMSMEInvoice?pageNo=" + this.pageNo + "&pageSize=10&searchValue=" + formData.searchValue?.trim() + str, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(res.responseData);
          this.totalRows = res.responseData1.totalCount;
          this.totalRows > 10 && this.pageNo == 1 ? this.paginator?.firstPage() : '';
        } else {
          this.spinner.hide();
          this.dataSource = [];
          this.totalRows = 0;
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
        this.spinner.hide();
      },
      error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
    })
  }


  pageChanged(pg: any) {
    this.pageNo = pg.pageIndex + 1;
    this.getMSMEData();
  }

  approveReject(object:any,flag: any) {
    let obj: any = ConfigService.dialogObj;
    obj['p1'] = flag == 1 ? 'Are you sure you want to approve?' : 'Are you sure you want to reject ?';
    obj['cardTitle'] = flag == 1 ? 'Application  Approve' : 'Application  Reject';
    obj['successBtnText'] = flag == 1 ? 'Approve' : 'Reject';
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
          "loadingSlipInvoiceId": object.loadingSlipInvoiceId,
          "approverId": this.webStorageService.getUserId(),
          "remark": res.remark,
          "status":flag,
        }
        this.apiService.setHttp('PUT', "MSMEInvoice/UpdateMSMEInvoice", false, obj, false, 'WBMiningService');
        this.apiService.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == 200) {
              this.commonMethod.matSnackBar(res.statusMessage, 0);
              this.getMSMEData();
              this.spinner.hide();
            } else {
              this.spinner.hide();
              this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
            }
            this.spinner.hide();
          }
        })
      }
    })
  }
}
