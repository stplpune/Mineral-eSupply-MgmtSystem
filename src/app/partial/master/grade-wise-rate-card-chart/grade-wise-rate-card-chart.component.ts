import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { AddRateCardComponent } from './add-rate-card/add-rate-card.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grade-wise-rate-card-chart',
  templateUrl: './grade-wise-rate-card-chart.component.html',
  styleUrls: ['./grade-wise-rate-card-chart.component.scss']
})
export class GradeWiseRateCardChartComponent implements OnInit {

  displayedColumns: string[] = ['srno', 'coalGradeName','unit','baseRate','cgst','sgst','igst','cess','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  searchText = new FormControl('');
  pageNumber: number = 1;
  pagesize: number = 10;
  coalGradewiseRateMasterArray: any;
  totalRows: any;
  highlightedRow:any;
  gradeWiseRateForm: FormGroup | any;

  constructor(
    public dialog: MatDialog,
    public configService: ConfigService,
    public commonService: CommonMethodsService,
    public validationService: FormsValidationService,
    public callApiService: CallApiService,
    public errorSerivce: ErrorHandlerService,
    public commonApiCallService: CommonApiCallService,
    private webStorageService:WebStorageService
  ) { }

  ngOnInit(): void {
    this.getCoalGradewiseRateMaster();
  }

  getCoalGradewiseRateMaster() {  
      let obj =  'Search=' + this.searchText.value?.trim() + '&pageno=' + this.pageNumber + '&pagesize=' + this.pagesize
    this.callApiService.setHttp('get', "CoalGradewiseRateMaster?" + obj, false, false, false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
          this.totalRows = res.responseData.responseData2?.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
        } else {
          this.coalGradewiseRateMasterArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : '';
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getCoalGradewiseRateMaster();
  }

  // deleteConformation(id: any) {
  //   this.highlightedRow = id;
  //   let obj: any = ConfigService.dialogObj;
  //   obj['p1'] = 'Are you sure you want to delete this record?';
  //   obj['cardTitle'] = 'Delete';
  //   obj['successBtnText'] = 'Delete';
  //   obj['cancelBtnText'] = 'Cancel';
  //   obj['inputType'] = false;
  //   const dialog = this.dialog.open(ConfirmationComponent, {
  //     width: this.configService.dialogBoxWidth[0],
  //     data: obj,
  //     disableClose: this.configService.disableCloseBtnFlag,
  //   })
  //   dialog.afterClosed().subscribe(res => {
  //     if (res == 'Yes') {
  //       this.deleteGradeCard();
  //     }
  //   })
  // }

  // deleteGradeCard() {
  //   let obj = {
  //     "id": this.highlightedRow,
  //     "deletedBy": 1
  //   } 
  //   this.callApiService.setHttp('DELETE', "CoalGradewiseRateMaster/DeleteCoalGradeRateMaster", false, obj, false, 'WBMiningService');
  //   this.callApiService.getHttp().subscribe({
  //     next: (res: any) => {
  //       if (res.statusCode === "200") {
  //         this.commonService.matSnackBar(res.statusMessage, 0);
  //         this.pageNumber = 1;
  //         this.getCoalGradewiseRateMaster();
  //       } else {
  //         this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);;
  //       }
  //     },
  //     error: ((error: any) => { this.errorSerivce.handelError(error.status) })
  //   });
  // }

    openAddRateCardrModal(obj: any) {
      this.highlightedRow = obj.id;
      const dialogRef = this.dialog.open(AddRateCardComponent, {
        width: '600px',
        height: 'auto',
        disableClose: true,
        data: obj,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
          this.getCoalGradewiseRateMaster();
      });
    }

 }


