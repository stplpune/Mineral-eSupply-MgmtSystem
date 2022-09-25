import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-msme-application-list',
  templateUrl: './msme-application-list.component.html',
  styleUrls: ['./msme-application-list.component.scss']
})
export class MsmeApplicationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['srno', 'applicationNumber', 'application_date', 'applicationYear', 'allocatedQty', 'level2Status', 'AGREMENT', 'SECURITY DEPOSIT'];
  dataSource:any;
  yearArray:any =[];
  filterForm:any;
  totalRows:any;
  pageNumber:number = 1 ;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService :ConfigService,
    public commonService: CommonApiCallService,
    private webStorageService:WebStorageService,
    public vs: FormsValidationService,
    public fileUploadService: FileUploadService,
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
    }

    getData() {
      this.spinner.show()
      let formValue = this.filterForm.value;
      let paramList: string = "applicationYear=" + formValue.applicationYear + "&pageNo=" + this.pageNumber + "&pageSize=" + 10;
      this.commonMethod.checkDataType(formValue.applicationNumber.trim()) == true ? paramList += "&applicationNumber=" + formValue.applicationNumber : '';
      this.apiService.setHttp('get', "CoalApplication/GetCoalApplicationView?" + paramList, false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode === 200 && res.responseData.length > 0) {
            console.log(res.responseData[0]);
            this.dataSource = new MatTableDataSource(res.responseData);
            this.dataSource.sort = this.sort;
            this.totalRows = res.responseData1.totalCount;
            this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.dataSource = [];
            this.totalRows = 0;
            this.paginator.pageIndex = 0;
            if (res.statusCode != "404") {
              this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
            }
          }
        },
        error: ((error: any) => { this.error.handelError(error.status), this.spinner.hide() })
      });
    }
  
  
    searchData() {
      this.pageNumber = 1;
      this.paginator.pageIndex = 0;
      this.getData();
    }
  
    pageChanged(event: any) {
      this.pageNumber = event.pageIndex + 1;
      this.getData();
    }

  uploadMsmeDoc(event: any, id: any, type: any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const selResult = event.target.value.split('.');
      const docExt = selResult.pop();
      if(docExt == 'png' || docExt == 'jpg' || docExt == 'jpeg' || docExt == 'pdf'){
        const reader: any = new FileReader();
        reader.onload = () => {
          const formData = new FormData();
          formData.append('applicationId', id);
          formData.append('DocType', type);
          formData.append('DocumentData', file);
          this.apiService.setHttp('post', "CoalApplication/UploadApplicationMSMEDocument", false, formData, false, 'WBMiningService');
          this.apiService.getHttp().subscribe({
            next: (res: any) => {
              if (res.statusCode === 200 && res.responseData) {
                this.getData();
                this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
              } else {
                this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
              }
              this.spinner.hide();
            },
            error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
          })
        }
        reader.readAsDataURL(event.target.files[0]);
      }else{
        this.commonMethod.matSnackBar('Only Supported file Types... pdf, jpg, png, jpeg', 1)
      }
    }
  }

  viewDocument(path: any) {
    if (path) {
      window.open(path, '_blank');
    }
  }

}
