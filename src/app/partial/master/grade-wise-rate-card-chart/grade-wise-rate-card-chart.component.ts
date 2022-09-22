import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-grade-wise-rate-card-chart',
  templateUrl: './grade-wise-rate-card-chart.component.html',
  styleUrls: ['./grade-wise-rate-card-chart.component.scss']
})
export class GradeWiseRateCardChartComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false;
  minearlNameArr: any[] = ['Sand', 'Stone'];

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
    private fv: FormsValidationService,

    public commonService: CommonMethodsService,
    private fb: FormBuilder,
    public validationService: FormsValidationService,
    public callApiService: CallApiService,
    public errorSerivce: ErrorHandlerService,
    public commonApiCallService: CommonApiCallService,
    private webStorageService:WebStorageService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.defaultForm();
    this.getCoalGradewiseRateMaster();
  }

  createForm() {
    this.form = this.fb.group({
      mineral: this.fb.array([])
    });

    const formArray = this.minearlNameArr.map((m) => {
      return this.fb.group({
        mineralName: [m],
        mineralCharge: ['', [Validators.pattern(this.fv.numbersWithDot)]]
      })
    }
    );

    this.form.setControl('mineral', this.fb.array(formArray));
  }

  get minerals() {
    return this.form.get("mineral") as FormArray;
  }

  onSubmitMain() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isSubmitted = false;
      console.log(this.form.value);
    }
  }


  deleteRecord() {
    let obj: any = ConfigService.dialogObj;

    obj['p1'] = 'Are you sure you want to delete this record?';
    obj['cardTitle'] = 'Delete';
    obj['successBtnText'] = 'Delete';
    obj['cancelBtnText'] = 'Cancel';

    const dialog = this.dialog.open(ConfirmationComponent, {
      width: this.configService.dialogBoxWidth[0],
      data: obj,
      disableClose: this.configService.disableCloseBtnFlag,
    })
    dialog.afterClosed().subscribe(res => {

    })
  }

  getCoalGradewiseRateMaster() {
      let obj =  'Search=' + this.searchText.value + '&pageno=' + this.pageNumber + '&pagesize=' + this.pagesize
    this.callApiService.setHttp('get', "CoalGradewiseRateMaster?" + obj, false, false, false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.coalGradewiseRateMasterArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
        } else {
          this.coalGradewiseRateMasterArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : '';
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
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
        this.deleteGradeCard();
      }
    })
  }

  deleteGradeCard() {
    let obj = {
      "id": 0,
      "deletedBy": 0
    }
    this.callApiService.setHttp('DELETE', "CoalGradewiseRateMaster/DeleteCoalGradeRateMaster", false, JSON.stringify(obj), false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.commonService.matSnackBar(res.statusMessage, 0);
          this.getCoalGradewiseRateMaster();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);;
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  defaultForm(){
    this.gradeWiseRateForm = this.fb.group({
      id: [''],
      basePrice: [''],
      cgst: [''],
      sgst: [''],
      igst: [''],
    })
  }

  onSubmit() {
      let formData = this.gradeWiseRateForm.value;

     let obj = {
      "createdBy": this.webStorageService.getUserId(),
      "modifiedBy": this.webStorageService.getUserId(),
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      "coalGradeId": 0,
      "basePrice": 0,
      "cgst": 0,
      "sgst": 0,
      "igst": 0,
      "flag": "string"
    }

      let formType = 'POST';
      this.callApiService.setHttp(formType, 'CoalApplication/SaveCoalApplication', false, obj, false, 'WBMiningService');
      this.callApiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.commonService.matSnackBar(res.statusMessage, 0);
        } else {
          this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }

    openAddRateCardrModal() {
      const dialogRef = this.dialog.open(AddRateCardComponent, {
        width: '600px',
        height: 'auto',
        disableClose: true,
        data: ''
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        // result == 'u' ? this.getData() : result == 'i' ? this.searchData() : '';
      });
    }

}
