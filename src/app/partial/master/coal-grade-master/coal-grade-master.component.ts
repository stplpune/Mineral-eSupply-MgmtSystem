import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from './../../../configs/config.service';
import { ErrorHandlerService } from './../../../core/services/error-handler.service';
import { FormsValidationService } from './../../../core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coal-grade-master',
  templateUrl: './coal-grade-master.component.html',
  styleUrls: ['./coal-grade-master.component.scss']
})
export class CoalGradeMasterComponent implements OnInit {

  displayedColumns: string[] = ['position', 'gradeName', 'action'];
  dataSource: any;
  coalFrm !: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  highlightedRow: any;


  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    private webStorageService: WebStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getCoalGrade();
  }

  defaultForm() {
    this.coalFrm = this.fb.group({
      id: [0],
      flag: [0],
      coal: ['', [Validators.required, Validators.pattern('^[^\\s\\[\\[`&._@#%*!+"\'\/\\]\\]{}][0-9a-zA-Z&s\\s]+$')]],
    })
  }

  getCoalGrade() {
    let obj = 'Search=' + '' + '&pageno=' + this.pageNumber + '&pagesize=' + this.pagesize;
    this.apiService.setHttp('get', "CoalGrade?" + obj, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.dataSource = new MatTableDataSource(res.responseData?.responseData1);
          this.totalRows = res.responseData.responseData2.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getCoalGrade();
  }

  saveUpdate() {
    this.spinner.show();
    if (this.coalFrm.invalid) {
      this.spinner.hide();
      return;
    }

    let obj = {
      "id": this.coalFrm.value.id,
      "gradeName": this.coalFrm.value.coal,
      "createdby": this.webStorageService.getUserId(),
      "flag": this.coalFrm.value.flag
    }

    this.apiService.setHttp('post', "CoalGrade", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.formGroupDirective.resetForm();
          this.defaultForm();
          this.pageNumber = 1;
          this.getCoalGrade();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status), this.spinner.hide(); })
    })
  }

  updateCoalGrade(obj: any) {
    this.coalFrm.patchValue({
      id: obj.id,
      coal: obj.gradeName,
      flag: 1,
    })
  }

  deleteConformation(id: any) {
    this.highlightedRow = id;
    let obj: any = ConfigService.dialogObj;
    obj['p1'] = 'Are you sure you want to delete this record?';
    obj['cardTitle'] = 'Delete';
    obj['successBtnText'] = 'Delete';
    obj['cancelBtnText'] = 'Cancel';
    obj['inputType'] = false;
    const dialog = this.dialog.open(ConfirmationComponent, {
      width: this.configService.dialogBoxWidth[0],
      data: obj,
      disableClose: this.configService.disableCloseBtnFlag,
    })
    dialog.afterClosed().subscribe(res => {
      if (res == 'Yes') {
        this.deleteCoalGrade();
      }
    })
  }

  deleteCoalGrade() {  // this.highlightedRow == id
    let obj = {
      "id": this.highlightedRow,
      "deletedBy": 1
    }
    
    this.apiService.setHttp('DELETE', "CoalGrade/DeleteCoalGrade", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.pageNumber = 1;
          this.getCoalGrade();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);;
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }


}

