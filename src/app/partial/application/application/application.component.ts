import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['srno', 'approval_status', 'application_number', 'application_date','allocated_quantity','Year','Consumer_name','district','view'];
  dataSource:any;
  yearArray:any =[];
  filterForm:any;
  districtArray : any[] = [];
  totalRows:any;
  pageNumber:number =1 ;
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService :ConfigService,
    public commonService: CommonApiCallService,
    private webStorageService:WebStorageService,
    public vs: FormsValidationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getyearDropDown();
    this.defaultForm();
    this.getData();
  }
  defaultForm(){
    this.filterForm =this.fb.group({
      applicationYear:[''],
      districtId:[''],
      applicationNumber:[''],
    })
  }

  getyearDropDown() {
    const currentYear = new Date().getFullYear(); // 2020
    const startYear = currentYear - 4;
    const endYear = currentYear + 4;
    for (let i = startYear; i <= currentYear; i++) {
      this.yearArray.push(+i);
    }
    this.getdistrict();
  }

  getdistrict() {
    this.districtArray = [];
    this.commonService.getDistrictByStateId(36).subscribe({
      next: (response: any) => {
        this.districtArray.push({ 'value': '', 'text': 'All District' }, ...response);
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getData() {
    this.spinner.show()
    let formValue = this.filterForm.value;
    let paramList: string = "applicationYear=" + formValue.applicationYear + "&districtId=" + formValue.districtId + "&pageNo=" + this.pageNumber + "&pageSize=" + 10 ;
    this.commonMethod.checkDataType(formValue.applicationNumber.trim()) == true ? paramList += "&applicationNumber=" + formValue.applicationNumber : '';
    this.apiService.setHttp('get', "CoalApplication/GetCoalApplicationView?" + paramList, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          console.log(res.responseData[0]);
          this.dataSource = new MatTableDataSource(res.responseData);
          this.totalRows = res.responseData1.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.dataSource = [];
          this.totalRows = 0;
          if (res.statusCode != "404") {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }


  searchData() {
    this.pageNumber = 1;
    this.getData();
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getData();
  }
}

