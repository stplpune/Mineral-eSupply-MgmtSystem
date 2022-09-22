import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { PeriodicElement } from '../../master/consumer-registration/consumer-registration.component';

@Component({
  selector: 'app-user-right-access',
  templateUrl: './user-right-access.component.html',
  styleUrls: ['./user-right-access.component.scss']
})
export class UserRightAccessComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  userTypeArray = new Array();
  subUserTypeArray = new Array();
  filterForm!: FormGroup;
  pageNumber: number = 1;
  totalRows!: number;
  localstorageData:any;

  displayedColumns: string[] = ['srno', 'pageName', 'pageURL', 'pageIcon', 'select'];

  constructor(private commonService: CommonApiCallService, private fb: FormBuilder, private apiService: CallApiService, private commonMethod:CommonMethodsService,
    private error: ErrorHandlerService, private spinner: NgxSpinnerService, private webstorageService:WebStorageService) { }

  ngOnInit(): void {
    this.localstorageData = this.webstorageService.getLoggedInLocalstorageData();
    this.defaultForm();
    this.getPageList();
    this.getusertype();
  }

  defaultForm() {
    this.filterForm = this.fb.group({
      searchValue: [''],
      userTypeId: [0],
      subUserTypeId: [0],
    })
  }

  getusertype() {
    this.commonService.getuserType().subscribe({
      next: (response: any) => {
        response.pop();
        this.userTypeArray.push({ 'value': 0, 'text': 'Select User Type' }, ...response);
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getSubuserType() {
    this.subUserTypeArray = [];
    this.commonService.getSubuserType(this.filterForm.value.userTypeId).subscribe({
      next: (response: any) => {
        response.length == 1 ? (this.subUserTypeArray = response, this.filterForm.controls['subUserTypeId'].setValue(this.subUserTypeArray[0].value)) : this.subUserTypeArray.push({ 'value': 0, 'text': 'Select Sub User Type' }, ...response);
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }


  getPageList() {
    let formValue = this.filterForm.value
    let param = "?searchValue=+" + formValue.searchValue.trim() + "&userTypeId=" + formValue.userTypeId + "&subUserTypeId=" + formValue.subUserTypeId + "&pageNo=" + this.pageNumber + "&pageSize=10"
    this.apiService.setHttp('get', "UserPage/GetUserRights" + param, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = new MatTableDataSource(res.responseData);
          this.totalRows = res?.responseData1?.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.dataSource = [];
          this.totalRows = 0;
        }

      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  addUpdatePageRights(event:any, pageId:any){
    let obj = {
      userId:this.localstorageData.responseData.userId,
      subUserId:this.localstorageData.responseData.subUserTypeId,
      pageId:pageId,
      isReadWriteAccess:event
    }
    this.apiService.setHttp('Post', "UserPage/AddUpdatePageRights", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.commonMethod.matSnackBar(res.statusMessage, event ? 0 : 1);
          this.getPageList();
        } 
      },
      error: ((error: any) => { this.error.handelError(error.status) })
  })
}


  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getPageList();
  }

  onSubmit(){
    this.pageNumber =1;
    this.getPageList();
  }


}
