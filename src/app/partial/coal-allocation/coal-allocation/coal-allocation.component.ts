import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { MatTableDataSource } from '@angular/material/table';
type NewType = FormControl;

@Component({
  selector: 'app-coal-allocation',
  templateUrl: './coal-allocation.component.html',
  styleUrls: ['./coal-allocation.component.scss']
})
export class CoalAllocationComponent implements OnInit {
  //------------------ ECL Monthly Allocation variable ---------------//
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  ECLColumns: string[] = ['srno',  'collieryName', 'allocationQty', 'action'];
  private _monthlyFrmECl!: FormGroup;
  public get monthlyFrmECl(): FormGroup {
    return this._monthlyFrmECl;
  }
  public set monthlyFrmECl(value: FormGroup) {
    this._monthlyFrmECl = value;
  }
  monthlySearch = new FormControl('');
  pageNumber = 1
  yearArray: any[] = [];
  ECLDatasource : any;
  collieryArray: any ;
  saveUpdateBtnECL :string = 'Submit';
  UpdateEclData :any;
  minearlNameArr=['data','dat1','data1']
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    public webStorageService:WebStorageService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.defaultFormECL();
    this.getMonthYear();


  this.defaultDistribution()

  }





  //------------------ ECL Monthly Allocation start here ---------------//
 defaultFormECL() {
    this.monthlyFrmECl = this.fb.group({
      "collieryId": ['',[Validators.required]],
      "monthYear": ['',[Validators.required]],
      "allocationQty": ['',[Validators.required,Validators.pattern(this.validation.numbersWithDot)]],
    })
  }

  getECLData() {
    this.spinner.show();

    this.apiService.setHttp('get', "ECLMonthlyAllocation/GetAll?MonthYear="+ this.monthlySearch.value +"&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          console.log(res);
          this.ECLDatasource = new MatTableDataSource(res.responseData);
          this.spinner.hide();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  SaveUpdateECl() {
    this.spinner.show();
    let formValue = this.monthlyFrmECl.value;
    if (this.monthlyFrmECl.invalid) {
      this.spinner.hide();
      return;
    }

    let obj = {
      "id":  this.UpdateEclData ?this.UpdateEclData.id :0 ,
      "collieryId":  +formValue.collieryId,
      "monthYear": formValue.monthYear,
      "allocationDate": new Date(),
      "allocationQty":+formValue.allocationQty,
      "createdBy": this.webStorageService.getUserId()
    }
    this.apiService.setHttp('post', "ECLMonthlyAllocation/Create", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage,0);
          this.clearECL();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getMonthYear() {
    this.yearArray = [];
    this.commonService.getMonthYear().subscribe({
      next: (response: any) => {
        this.yearArray = response//.push({ 'value': 0, 'text': 'All State' }, ...response);
        this.monthlySearch = new FormControl(this.yearArray[0].text);
        this.getCollieryData();
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getCollieryData() {
    this.commonService.getCollieryNameList().subscribe({
      next: (response: any) => {
        this.collieryArray = response//.push({ 'value': 0, 'text': 'All State' }, ...response);
        this.getECLData();
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  clearECL(){
    this.saveUpdateBtnECL = 'Submit'
  this.formGroupDirective.resetForm();
  this.UpdateEclData = '';
  this.monthlySearch = new FormControl(this.yearArray[0].text);
  this.getECLData();
  }

  updateECl(element:any){
    this.UpdateEclData = element
    this.saveUpdateBtnECL = 'Update'
    this.monthlyFrmECl.patchValue({
      "collieryId": element.collieryId,
      "monthYear":element.monthYear,
      "allocationQty":element.allocationQty,
    })

  }

  //------------------ Coal Distribution start here  ---------------//
  coalDistribution :any ;
  distribution:any;
  coalDistributionColumn =['srNo','consumerName','tentitiveQty'];
  distributionColumns: string[] = ['srno',  'collieryName', 'allocationQty'];
  disabledQty =true;
  distributionForm !: FormGroup;
  defaultDistribution(){
    this.distributionForm = this.fb.group({
      distributionList: this.fb.array([])
    });
  }
  get distributionListControls() {
    return this.distributionForm.get("distributionList") as FormArray;
  }

  getcoalDistributionData(){
    this.apiService.setHttp('get', "CoalDistribution/Distribute?MonthYear=Oct-22&Year=2022", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage,0);
          this.coalDistribution =  res.responseData;
          this.bindDistribution();

        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  bindDistribution(){
    const formArray = this.coalDistribution.map((m:any) => {
      return this.fb.group({
        consumerName: [m.consumerName],
        tentitiveQty: [m.tentitiveQty]
      })
    }
  );

  this.distributionForm.setControl('distributionList', this.fb.array(formArray));
  }

  saveUpdateDistributionData(){
    console.log(this.distributionForm.value);
  }

}
