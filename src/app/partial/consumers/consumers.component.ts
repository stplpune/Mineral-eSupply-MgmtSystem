import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss']
})
export class ConsumersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterForm: FormGroup | any;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  dataSource: any;  
  stateFilterArray: any[] = [];
  displayedColumns: string[] = ['srno', 'consumerName', 'mobileNo', 'consumerTypeId', 'emailId', 'consumerDocuments', 'action'];
  applicationTypeFilterArray = ['All', 'Individual', 'Organization'];

  constructor(private fb: FormBuilder,
    public callApiService: CallApiService,
    public commonService: CommonMethodsService,
    public errorSerivce: ErrorHandlerService,
    public configService: ConfigService,
    public validationService: FormsValidationService,
    public commonApiCallService: CommonApiCallService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.defaultFilterForm();
    this.getConsumerRegistration();
    this.getState();
  }

  defaultFilterForm() {
    this.filterForm = this.fb.group({
      consumerType: [0],
      stateId: [0],
      searchText: [''],
    })
  }

  getConsumerRegistration() {
    let formData = this.filterForm.value;
    let obj = 'Textsearch=' + formData.searchText?.trim() + '&ConsumerTypeId=' + parseInt(formData.consumerType) + '&StateId=' + formData.stateId + '&pageno=' + this.pageNumber + '&pagesize=' + this.pagesize
    this.callApiService.setHttp('get', "api/ConsumerRegistration/GetConsumerDetails?" + obj, false, false, false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.responseData1) {
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
          this.totalRows = res.responseData.responseData2.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.dataSource = [];
          this.commonService.matSnackBar(res.statusMessage, 0);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    })
  }

  getState() {
    this.commonApiCallService.getState().subscribe({
      next: (response: any) => {
        this.stateFilterArray.push({ text: "All", value: 0 }, ...response);
      },
      error: (err => { this.errorSerivce.handelError(err) })
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getConsumerRegistration();
  }
}
