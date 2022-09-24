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
  ECLColumns: string[] = ['srno','collieryName', 'allocationQty', 'action'];
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
  monthlyAllocationDetails: any [] = [];
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

  tabChange(event: any) {
    let tabLabel =  event.tab.textLabel;
    if (tabLabel == "ECL Monthly Allocation") {
      this.getECLData('ECL');
    } else if (tabLabel == "Coal Distribution" ) {
      this.coalDistributionSearch.setValue(this.yearArray[0].text);
      this.getECLData('distribution');
    }else if(tabLabel == "MSME Consumer Booking"){
      this.bookingQtySearch.setValue(this.yearArray[0].text)
      this.getBookingData();
    }

  }




  //------------------ ECL Monthly Allocation start here ---------------//
 defaultFormECL() {
    this.monthlyFrmECl = this.fb.group({
      "collieryId": ['',[Validators.required]],
      "monthYear": ['',[Validators.required]],
      "allocationQty": ['',[Validators.required,Validators.pattern(this.validation.numbersWithDot)]],
    })
  }

  getECLData(flag?:any) {
    let searchData :any ='';
    if(flag == 'ECL'){
      searchData =   this.monthlySearch.value
    }else if(flag == 'distribution'){
      searchData= this.coalDistributionSearch.value
    }
    this.spinner.show();
    this.apiService.setHttp('get', "ECLMonthlyAllocation/GetAll?MonthYear="+ searchData +"&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.monthlyAllocationDetails = res.responseData
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
        this.getECLData('ECL');
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  clearECL(){
    this.saveUpdateBtnECL = 'Submit'
  this.formGroupDirective.resetForm();
  this.UpdateEclData = '';
  this.monthlySearch = new FormControl(this.yearArray[0].text);
  this.getECLData('ECL');
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
  coalDistribution :any [] =[] ;
  distribution:any;
  coalDistributionColumn =['srNo','consumerName','tentitiveQty'];
  distributionColumns: string[] = ['srno',  'collieryName', 'allocationQty'];
  disabledQty =true;
  distributionForm !: FormGroup;
  coalDistributionSearch = new FormControl('');

  defaultDistribution(){
    this.distributionForm = this.fb.group({
      distributionList: this.fb.array([])
    });
  }

  getDDistributionData(){
    this.getECLData('distribution');
  }
  get distributionListControls() {
    return this.distributionForm.get("distributionList") as FormArray;
  }

  getcoalDistributionData(){
    this.apiService.setHttp('get', "CoalDistribution/Distribute?MonthYear="+this.monthlySearch.value+"&Year=2022", false, false, false, 'WBMiningService');
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
        tentitiveQty: [m.tentitiveQty],
        msmeId:[m.id]
      })
    }
  );

  this.distributionForm.setControl('distributionList', this.fb.array(formArray));
  }

  createNewDistributer() {
let data:any=[];
    console.log(this.distributionForm.value);
    let formValue = this.distributionForm.value
    debugger
    formValue?.distributionList.forEach((ele:any)=>{
      let obj = {
        "id": 0,
        "msmeId": +ele.msmeId,
        "eclMonthlyAllocationId": 0,
        "tentitiveQty": +ele.tentitiveQty,
        "createdBy": this.webStorageService.getUserId(),
        "monthYear":this.monthlySearch.value
      }
      data.push(obj)
    })
    
  
    data.forEach((ele:any)=>{
      this.apiService.setHttp('post', "CoalDistribution/Create" , false, ele, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.spinner.hide();          
            console.log(res);
            // this.commonMethod.matSnackBar(res.statusMessage, 0); 
  
          } else {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
            this.spinner.hide();
          }
        },
        error: ((error: any) => { this.error.handelError(error.status) })
      })
    })
  }



// ---------------- MSME  Consumer Booking Quantity start here   -----------------------//
bookingQtySearch = new FormControl('');
bookingColums =['srno','collieryName','allocationQty','bookingQty','action'];
bookingDataSource :any;
// distributionColumns: string[] = ['srno',  'collieryName', 'allocationQty'];
// disabledQty =true;

getBookingData(){
  this.apiService.setHttp('get', "CoalDistribution/GetConsumerBookingQuantity?MonthYear="+this.bookingQtySearch.value+"&nopage=2022", false, false, false, 'WBMiningService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === 200) {
        this.spinner.hide();
        console.log(res)
        this.bookingDataSource = new MatTableDataSource(res.responseData);
        this.commonMethod.matSnackBar(res.statusMessage,0);

      } else {
        this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        this.spinner.hide();
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

}
