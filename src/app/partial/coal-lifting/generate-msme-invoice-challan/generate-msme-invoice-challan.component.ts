import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-generate-msme-invoice-challan',
  templateUrl: './generate-msme-invoice-challan.component.html',
  styleUrls: ['./generate-msme-invoice-challan.component.scss']
})
export class GenerateMsmeInvoiceChallanComponent implements OnInit {
  filterForm!: FormGroup;
  dataSource:any;
  totalRows!:number;
  pageSize:number = 1;
  maxDate = new Date();
  constructor(private spinner: NgxSpinnerService, public apiService: CallApiService, private fb: FormBuilder, 
    private commonMethod:CommonMethodsService, private error:ErrorHandlerService, private datePipe:DatePipe) { }

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
    let fromDate = this.datePipe.transform(formData.fromDate,'dd-MM-yyyy');
    let toDate = this.datePipe.transform(formData.toDate,'dd-MM-yyyy');
    this.apiService.setHttp('get', "/MSMEInvoice/GetMSMEInvoice?fromDate=" + fromDate + "&toDate=" + toDate + "&searchValue=" + formData.searchValue + "&pageNo=" + this.pageSize + "&pageSize=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.spinner.hide();
          this.dataSource = res.responseData.responseData1;
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
}
