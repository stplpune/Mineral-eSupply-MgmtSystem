import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { DatePipe } from '@angular/common';
type NewType = FormControl;

@Component({
  selector: 'app-coal-allocation',
  templateUrl: './coal-allocation.component.html',
  styleUrls: ['./coal-allocation.component.scss']
})
export class CoalAllocationComponent implements OnInit {
  //------------------ ECL Monthly Allocation variable ---------------//
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild(FormGroupDirective) eclClearForm!: FormGroupDirective;
  ECLColumns: string[] = ['srno', 'collieryName', 'allocationQty', 'action'];
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
  ECLDatasource: any;
  collieryArray: any;
  saveUpdateBtnECL: string = 'Submit';
  UpdateEclData: any;
  monthlyAllocationDetails: any[] = [];
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    public webStorageService: WebStorageService,
    public fileUploadService: FileUploadService,
    public datePipe:DatePipe,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.defaultFormECL();
    this.getMonthYear();
    this.defaultDistribution();
    this.defaultsclFrm();
    this.defaultSalesFrm();

  }

  tabChange(event: any) {
    let tabLabel = event.tab.textLabel;
    console.log(tabLabel)
    if (tabLabel == "ECL Monthly Allocation") {
      this.getECLData('ECL');
    } else if (tabLabel == "Coal Distribution") {
      this.coalDistribution = [];
      this.coalDistributionSearch.setValue(this.yearArray[0].text);
      this.getECLData('distribution');
      this.monthlyAllocationDetails[0]?.isCoalDistributed == 1 ? this.getcoalDistributionData() : '';
    } else if (tabLabel == "MSME Consumer Booking") {
      this.hidebookingtable = false;
      this.bookingQtySearch.setValue(this.yearArray[0].text);
      this.getBookingData();
    } else if (tabLabel == 'ECL Payment') {
      this.documentPath = '';
      this.isDocumentUpload = false;
      this.eclSearchData.setValue(this.yearArray[0].text);
      this.eclPaymentData();
    } else if (tabLabel == "Sales Order") {
      this.hidesubmitBtn=false;
      this.eclsearchFrm.setValue(this.yearArray[0].text);
      this.clearSalesOrderForm();
      this.getSalesOrderData();
    }else if(tabLabel == 'Delivery Order'){
      this.searchDeliveryOrder.setValue(this.yearArray[0].text);
      this.getDeliveryData();
    }

  }




  //------------------ ECL Monthly Allocation start here ---------------//
  defaultFormECL() {
    this.monthlyFrmECl = this.fb.group({
      "collieryId": ['', [Validators.required]],
      "monthYear": ['', [Validators.required]],
      "allocationQty": ['', [Validators.required, Validators.pattern(this.validation.numbersWithDot)]],
    })
  }

  getECLData(flag?: any) {
    let searchData: any = '';
    if (flag == 'ECL') {
      searchData = this.monthlySearch.value
    } else if (flag == 'distribution') {
      searchData = this.coalDistributionSearch.value
    }
    this.spinner.show();
    this.apiService.setHttp('get', "ECLMonthlyAllocation/GetAll?MonthYear=" + searchData + "&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.monthlyAllocationDetails = res.responseData
          this.ECLDatasource = new MatTableDataSource(res.responseData);
          this.spinner.hide();
        } else {
          this.ECLDatasource = []
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
      "id": this.UpdateEclData ? this.UpdateEclData.id : 0,
      "collieryId": +formValue.collieryId,
      "monthYear": formValue.monthYear,
      "allocationDate": new Date(),
      "allocationQty": +formValue.allocationQty,
      "createdBy": this.webStorageService.getUserId()
    }
    this.apiService.setHttp('post', "ECLMonthlyAllocation/Create", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage, 0);
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

  clearECL() {
    this.saveUpdateBtnECL = 'Submit'
    this.formGroupDirective.resetForm();
    this.UpdateEclData = '';
    // this.monthlySearch = new FormControl(this.yearArray[0].text);
    this.getECLData('ECL');
  }

  updateECl(element: any) {
    this.UpdateEclData = element
    this.saveUpdateBtnECL = 'Update'
    this.monthlyFrmECl.patchValue({
      "collieryId": element.collieryId,
      "monthYear": element.monthYear,
      "allocationQty": element.allocationQty,
    })

  }

  //------------------ Coal Distribution start here  ---------------//
  coalDistribution: any[] = [];
  distribution: any;
  coalDistributionColumn = ['srNo', 'consumerName', 'tentitiveQty'];
  distributionColumns: string[] = ['srno', 'collieryName', 'allocationQty'];
  disabledQty = true;
  distributionForm !: FormGroup;
  coalDistributionSearch = new FormControl('');
  hidebookingtable: boolean = false;

  defaultDistribution() {
    this.distributionForm = this.fb.group({
      distributionList: this.fb.array([])
    });
  }

  getDDistributionData() {
    this.getECLData('distribution');
    console.log(this.monthlyAllocationDetails[0]?.isCoalDistributed);
    this.monthlyAllocationDetails[0]?.isCoalDistributed == 1 ? this.getcoalDistributionData() : this.coalDistribution = [];
  }
  get distributionListControls() {
    return this.distributionForm.get("distributionList") as FormArray;
  }

  getcoalDistributionData() {
    let year:any = this.coalDistributionSearch.value;
      year= year.split('-');
    this.apiService.setHttp('get', "CoalDistribution/Distribute?MonthYear=" + this.coalDistributionSearch.value + "&Year="+year[1], false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          // this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.coalDistribution = res.responseData;
          this.bindDistribution();

        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  bindDistribution() {
    const formArray = this.coalDistribution.map((m: any) => {
      return this.fb.group({
        consumerName: [m.consumerName],
        tentitiveQty: [m.tentitiveQty],
        msmeId: [m.id]
      })
    }
    );

    this.distributionForm.setControl('distributionList', this.fb.array(formArray));
  }

  createNewDistributer() {
    let data: any = [];
    console.log(this.distributionForm.value);
    let formValue = this.distributionForm.value;
    formValue?.distributionList.forEach((ele: any) => {
      let obj = {
        "id": 0,
        "msmeId": +ele.msmeId,
        "eclMonthlyAllocationId": 0,
        "tentitiveQty": +ele.tentitiveQty,
        "createdBy": this.webStorageService.getUserId(),
        "monthYear": this.coalDistributionSearch.value
      }
      data.push(obj)
    })


    data.forEach((ele: any,ind:number) => {
      this.apiService.setHttp('post', "CoalDistribution/Create", false, ele, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.spinner.hide();
            data.length -1 == ind ? (this.commonMethod.matSnackBar(res.statusMessage, 0),this.getcoalDistributionData()):'';
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
  bookingColums = ['srno', 'collieryName', 'allocationQty', 'bookingQty', 'action'];
  bookingPaymentColums = ['srno', 'consumerName', 'tentitiveQty', 'bookingQty', 'amount', 'status', 'action'];
  bookingDataSource: any;
  bookingPaymentDataSource: any;
  // distributionColumns: string[] = ['srno',  'collieryName', 'allocationQty'];
  // disabledQty =true;
  coalDistributionMemberArray: any = [];
  bookingPaymentDetails: any = [];
  eclMonthlyAllocationId: any;


  getBookingData() {
    this.apiService.setHttp('get', "CoalDistribution/GetConsumerBookingQuantity?MonthYear=" + this.bookingQtySearch.value + "&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.bookingDataSource = new MatTableDataSource(res.responseData);
          // this.commonMethod.matSnackBar(res.statusMessage, 0);

        } else {
          this.bookingDataSource = [];
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getPaymentForBooking(ele?: any) {
    ele ? this.eclMonthlyAllocationId = ele.id : ""
    this.apiService.setHttp('get', "CoalDistribution/GetMSMEConsumerDataById?ECLMonthlyAllocationId=" + this.eclMonthlyAllocationId, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.hidebookingtable = true;
          this.bookingPaymentDetails = res.responseData;
          this.bookingPaymentDataSource = new MatTableDataSource(res.responseData);
          // this.commonMethod.matSnackBar(res.statusMessage, 0);
        } else {
          this.bookingPaymentDataSource = [];
          this.bookingPaymentDetails = [];
          this.hidebookingtable = true;
          res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  addRemoveCoalDistributionMember(event: any, object: any) {
    let checkedFlag = event.checked;
    console.log(object);
    if (checkedFlag) {
      let obj = {
        "coalDistributionId": object?.coalDistributionId,
        "eclPaymentId": 0,
        "quantity": object.bookingQty,
        "amount": object.amount,
      }

      this.coalDistributionMemberArray.push(obj)
    } else if (!checkedFlag) {
      this.coalDistributionMemberArray.map((ele: any, ind: number) => {
        if (ele.coalDistributionId == object?.coalDistributionId) {
          this.coalDistributionMemberArray.splice(ind, 1);
        }
      })
    }
  }

  paymentForECL() {
    this.spinner.show();
    if (!this.coalDistributionMemberArray.length) {
      this.spinner.hide();
      this.commonMethod.matSnackBar("Please select consumer name ..", 1);
      return
    }
    const initialValue = 0;
    const quantitySum = this.coalDistributionMemberArray.reduce((previousValue: any, currentValue: any) => previousValue + Number(currentValue.quantity), initialValue);
    const amountSum = this.coalDistributionMemberArray.reduce((previousValue: any, currentValue: any) => previousValue + Number(currentValue.amount), initialValue);
    this.coalDistributionMemberArray.map((ele: any) => { delete ele.quantity, delete ele.amount });
    let obj = {
      "monthYear": this.bookingQtySearch.value,
      "quantity": quantitySum,
      "amount": amountSum,
      "createdBy": 0,
      "coalDistributionMember": this.coalDistributionMemberArray
    }

    this.apiService.setHttp('post', "CoalDistribution/AcceptForECLPayment", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.getPaymentForBooking();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }


  //-------------------------- ELC Payment start here -----------------------//
  eclPaymentFrom !: FormGroup;
  eclPaymentDatasource: any;
  eclSearchData = new FormControl('');
  eclPaymentColums = ['srno', 'collieryName', 'bookingID', 'amount', 'date', 'transactionNo', 'status', 'action'];
  WBMDTCLAccountArray: any;
  eclBankListArray: any;
  isDocumentUpload: boolean = false;
  documentPath: any;
  minDate = new Date();
  @ViewChild('FormDirectiveEcl')
  private FormDirectiveEcl!: NgForm

  defaultsclFrm() {
    this.eclPaymentFrom = this.fb.group({
      bookinId: [''],
      wbAccountId: ['', [Validators.required]],
      eclAccountId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(this.validation.numbersWithDot)]],
      transactionDate: ['', [Validators.required]],
      utrNo: ['', [Validators.required]],
      attchmentPath: [''],
    })
    this.getWBMDTCLAccount();
  }
  get eclFormControl(): any {
    return this.eclPaymentFrom.controls;
  }

  eclPaymentData() {
    this.documentPath = '';
    this.isDocumentUpload = false;
    this.spinner.show();
    this.apiService.setHttp('get', "CoalDistribution/GetEClPaymentDetails?MonthYear=" + this.eclSearchData.value + "&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.eclPaymentDatasource = new MatTableDataSource(res.responseData);
          // this.commonMethod.matSnackBar(res.statusMessage, 0);
        } else {
          this.eclPaymentDatasource = [];
          res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  eclPatchData(data: any) {

    this.eclPaymentFrom.patchValue({
      bookinId: data?.bookingID,
      quantity: data?.quantity
    })

  }


  updateEclPaymentData() {
    this.spinner.show();
    let formValue = this.eclPaymentFrom.value;
    if (this.eclPaymentFrom.invalid) {
      this.spinner.hide();
      return
    } else if (this.commonMethod.checkDataType(this.documentPath) == false) {
      this.spinner.hide();
      this.commonMethod.matSnackBar('Please Upload Payment Slip', 1);
      return;
    }

    let obj = {
      "bookinId": formValue.bookinId,
      "wbAccountId": formValue.wbAccountId,
      "eclAccountId": formValue.eclAccountId,
      "quantity": formValue.quantity,
      "amount": formValue.amount,
      "transactionDate": formValue.transactionDate,
      "utrNo": formValue.utrNo,
      "attchmentPath": this.documentPath
    }

    this.apiService.setHttp('post', "CoalDistribution/SaveEClPayment", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.documentPath = '';
          this.isDocumentUpload = false;
          this.clearEclForm();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getWBMDTCLAccount() {
    this.apiService.setHttp('get', "api/BookingAndDeliveryOrder/getBankAccountList", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.WBMDTCLAccountArray = res.responseData;
          this.getEclAccountBanklist()
        } else {
          this.WBMDTCLAccountArray = []
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getEclAccountBanklist() {
    this.apiService.setHttp('get', "CoalDistribution/getECLAccountList", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.eclBankListArray = res.responseData;
        } else {
          this.eclBankListArray = []
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  documentUpload(event: any) {
    this.spinner.show();
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, 0, 'paymentSlip', "png,jpg,jpeg,pdf", 5, 5000)
    documentUrl.subscribe({
      next: (ele: any) => {

        this.spinner.hide();
        documentUrlUploaed = ele.responseData.documentWebURL;
        this.documentPath = documentUrlUploaed;
        this.isDocumentUpload = true;

      },
    });
    this.spinner.hide();
  }

  clearEclForm() {
    this.eclPaymentFrom.reset();
    this.FormDirectiveEcl && this.FormDirectiveEcl.resetForm()

  }
  convertIntoDateFormat(date: any) {
    return new Date(date)
  }
  // -------------------------- sales order Code start here ---------------//
  salesOrderFrm: any;
  eclsearchFrm = new FormControl('');
  salesOrderDataSource: any;
  salesOrderColums = ['srno', 'bookingID', 'collieryName', 'quantity', 'salesOrderNo', 'salesOrderDate', 'action'];
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  saveUpdatesalesBtn:string = "submit";
  hidesubmitBtn :boolean =false;
  salesOrderUpdateData:any;
  defaultSalesFrm() {
    this.salesOrderFrm = this.fb.group({
      "bookingID": ['', [Validators.required]],
      "collieryId": ['', [Validators.required]],
      "quantity": ['', [Validators.required]],
      "salesOrderNo": ['', [Validators.required]],
      "salesOrderDate": ['', [Validators.required]],
    })
  }
  get salesFormControls() {
    return this.salesOrderFrm.controls
  }


  getSalesOrderData() {
    this.hidesubmitBtn=false;
    this.salesOrderUpdateData = '';
    this.apiService.setHttp('get', "CoalDistribution/GetSalesOrderData?MonthYear=" + this.eclsearchFrm.value + "&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          this.salesOrderDataSource = new MatTableDataSource(res.responseData);
        } else {
          this.salesOrderDataSource = [];
          res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  saveUpdateSalesOrder() {
    this.spinner.show();    
    let formValue = this.salesOrderFrm.value;
    if (this.salesOrderFrm.invalid) {
      this.spinner.hide();
      return
    }

    let obj = {
      "id": this.salesOrderUpdateData.id == 0 ? 0:this.salesOrderUpdateData.id,
      "monthYear": this.eclsearchFrm.value,
      "bookingID": +formValue.bookingID,
      "collieryId": +formValue.collieryId,
      "quantity": +formValue.quantity,
      "salesOrderNo": formValue.salesOrderNo,
      "salesOrderDate": formValue.salesOrderDate,
      "flag": this.salesOrderUpdateData.id==0 ?"i":'u',
      "createdBy": this.webStorageService.getUserId(),
    }

    this.apiService.setHttp('post', "CoalDistribution/SaveUpdateSalesOrder", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.getSalesOrderData();
          this.clearSalesOrderForm();
          this.spinner.hide();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          this.spinner.hide();
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  patchSalesOrder(data: any) {
    this.salesOrderUpdateData =data;
    let date ='' ;
    if(data.salesOrderDate){
      date = data.salesOrderDate.split('-')[1]+'-'+data.salesOrderDate.split('-')[0]+'-'+data.salesOrderDate.split('-')[2];
    }
    
    this.commonMethod.checkDataType(data.id) == true ?(this.saveUpdatesalesBtn = 'Update', this.hidesubmitBtn = true) :(this.saveUpdatesalesBtn = 'Submit', this.hidesubmitBtn = true);

    this.salesOrderFrm.patchValue({
      bookingID: data.bookingID,
      collieryId: data.collieryId,
      quantity: data.quantity,
      salesOrderNo: data.salesOrderNo,
      salesOrderDate:new Date(date)
    })
  }

  clearSalesOrderForm() {
    this.salesOrderFrm.reset();
    this.formDirective && this.formDirective.resetForm();
    this.salesOrderUpdateData ='';
  }

// --------------------- Delivery Order start here --------------------------//
searchDeliveryOrder =  new FormControl('');
deliveryOrderColums = ['srno', 'bookingID', 'collieryName', 'quantity', 'salesOrderNo',  'action'];
deliveryDataSource :any ;
genrateDataSource:any;
updateGenrateDataSource: any;

getDeliveryData(){
  this.spinner.show();
  this.apiService.setHttp('get', "CoalDistribution/GetDeliverOrderData?MonthYear=" + this.searchDeliveryOrder.value + "&nopage=1", false, false, false, 'WBMiningService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === 200) {
        this.spinner.hide();
        this.deliveryDataSource = new MatTableDataSource(res.responseData);
        // this.commonMethod.matSnackBar(res.statusMessage, 0);
      } else {
        this.deliveryDataSource = [];
        res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
        this.spinner.hide();
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}



getDelivaryDatById(id:any){
  this.spinner.show();
  this.apiService.setHttp('get', "CoalDistribution/GetEClPaymentDetails?MonthYear=" + this.searchDeliveryOrder.value + "&nopage=1", false, false, false, 'WBMiningService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === 200) {
        this.spinner.hide();
        this.updateGenrateDataSource = new MatTableDataSource(res.responseData);
        // this.commonMethod.matSnackBar(res.statusMessage, 0);
      } else {
        this.deliveryDataSource = [];
        res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
        this.spinner.hide();
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}


generateOrderSaveUpdate(){
  this.spinner.show();
  this.apiService.setHttp('get', "CoalDistribution/GetEClPaymentDetails?MonthYear=" + this.searchDeliveryOrder.value + "&nopage=1", false, false, false, 'WBMiningService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === 200) {
        this.spinner.hide();
        this.genrateDataSource = new MatTableDataSource(res.responseData);
      } else {
        this.genrateDataSource = [];
        res.statusCode != 404 ? this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1) : '';
        this.spinner.hide();
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

}
