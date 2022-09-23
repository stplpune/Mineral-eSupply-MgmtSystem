import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})
export class RegisterVehicleComponent implements OnInit {

  regVehicleFrm !: FormGroup;
  filterVehicleFrm!: FormGroup;
  stateNameArr: any [] = [];
  districtNameArr: any = [];
  transportTypeArr = ['Vehicle', 'Barge'];
  vehicleTypeArr = [{ id: 1, type: 'Tractor' }, { id: 2, type: 'Truck' }, { id: 3, type: 'Hywa' }, { id: 4, type: 'Other' }, { id: 6, type: 'Tipper' }];
  blockStsArr = [{ value: true, status: 'Block' }, { value: false, status: 'Unblock' }];
  isEdit: boolean = false;
  updateId: any;
  totalRows: any;
  pageNo = 1;
  pageSize = 10;
  displayedColumns: string[] = ['vehicleRegistrationNo', 'ownerName', 'isVerified', 'action',];
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  dataSource: any [] = [];
  eventFrontImg: any;
  eventSideImg: any;
  eventNumPlateImg: any;
  telecomProviderArr = ['Vodafone', 'Idea', 'Airtel', 'Jio', 'BSNL'];
  verificationStsArr = [{ id: 0, value: 'Yes' }, { id: 1, value: 'No' }]
  isImageUplaod: boolean = false;
  isSubmitted: boolean = false;
  @ViewChild('state') private refState!: ElementRef;
  @ViewChild('district') private refDistrict!: ElementRef;
  @ViewChild('series') private refSeries!: ElementRef;
  @ViewChild('number') private refNumber!: ElementRef;

  get f() { return this.regVehicleFrm.controls };

  constructor(public configService :ConfigService, 
    public fb: FormBuilder,    
    public apiService: CallApiService,
    public vs: FormsValidationService,
    public commonMethod: CommonMethodsService,
    public error: ErrorHandlerService, 
    private webStorageService:WebStorageService,
    private shareDataService: ShareDataService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public commonService: CommonApiCallService) { }

  ngOnInit(): void {
    this.createVehicleForm();
    this.createFilterForm();
    this.getStateNames();
    this.getVehicleList();
  }

  createFilterForm(){
    this.filterVehicleFrm = this.fb.group({
      verificationStatus: [this.verificationStsArr[0].id],
      textSearch: ['']
    })

  }

  changesFocusInput(val: any){
    if(val == 'state'){
      this.regVehicleFrm.controls['state'].valid ? (this.regVehicleFrm.value.numberFormat == 'New'? this.refDistrict.nativeElement.focus() : this.refNumber.nativeElement.focus()) : this.refState.nativeElement.focus();
    }else if(val == 'district'){
      this.regVehicleFrm.controls['district'].valid ? this.refSeries.nativeElement.focus() : this.refDistrict.nativeElement.focus();
    }else{
      this.regVehicleFrm.controls['series'].valid ? this.refNumber.nativeElement.focus() : this.refSeries.nativeElement.focus();
    }
  }

  createVehicleForm(){
    this.regVehicleFrm = this.fb.group({
      transportType: ['Vehicle', [Validators.required]],
      numberFormat: ['New', [Validators.required]],
      state: ['', [Validators.required, Validators.pattern(this.vs.onlyAlphabet)]],
      district: ['', [Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(2), Validators.minLength(2)]],
      series: ['', [Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(2), Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.pattern(this.vs.onlyNumbers)]],
      // bargeNumber: ['', [Validators.required, Validators.pattern(this.vs.alphaNumericOnly)]],
      isBlock: [''],
      remark: [''],
      ownerName: ['', [Validators.required, Validators.pattern(this.vs.alphabetsWithSpace)]],
      // stateId: ['', [Validators.required]],
      // districtId: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(this.vs.alphaNumericWithSpace)]],
      driverName: ['', [Validators.required, Validators.pattern(this.vs.alphabetsWithSpace)]],
      driverMobileNo: ['', [Validators.required, Validators.pattern(this.vs.valMobileNo), Validators.minLength(10), Validators.maxLength(10)]],
      eTpMobileNumber: ['', [Validators.pattern(this.vs.valMobileNo), Validators.minLength(10), Validators.maxLength(10)]],
      ownerMobileNumber: ['', [Validators.required, Validators.pattern(this.vs.valMobileNo), Validators.minLength(10), Validators.maxLength(10)]],
      vehicleTypeId: [0],
      permitNo: ['', [Validators.pattern(this.vs.alphaNumericOnly)]],
      licenseNo: ['', [Validators.pattern(this.vs.alphaNumericOnly)]],
      driverCompName: ['', [Validators.pattern(this.vs.alphaNumericWithSpace)]],
      deviceId: ['', [Validators.pattern(this.vs.alphaNumericOnly)]],
      deviceSIMNo: ['', [Validators.pattern(this.vs.onlyNumbers)]],
      secondarySIMNo: ['', [Validators.pattern(this.vs.onlyNumbers)]],
      primaryTelecomProvider: [''],
      secondaryTelecomProvider: [''],
      length: ['', [Validators.pattern(this.vs.numbersWithDot)]],
      width: ['', [Validators.pattern(this.vs.numbersWithDot)]],
      // otp: ['', [Validators.pattern(this.vs.onlyNumbers)]],
      frontImage: ['', [Validators.required]],
      sideImage: ['', [Validators.required]],
      numberPlateImage: ['', [Validators.required]],
      RFID: ['']
    })

    this.onTransportType(this.regVehicleFrm.value.transportType);
    this.onNumberFormatChange(this.regVehicleFrm.value.numberFormat);
  }

  getQueryString(){
    let str = "?pageno=" + this.pageNo + "&pagesize=" + this.pageSize;
    str += "&IsVerified=" + this.filterVehicleFrm.value.verificationStatus;
    this.filterVehicleFrm && this.filterVehicleFrm.value.textSearch && (str += "&Search=" + this.filterVehicleFrm.value.textSearch);
    // str += (this.filterVehicleFrm.value.verificationStatus ? "&pageno=" : "?pageno=") + this.pageNo + "&pagesize=" + this.pageSize;
    return str;
  }

  getVehicleList(){
    this.spinner.show();
    this.apiService.setHttp('get', "api/VehicleRegistration" + this.getQueryString(), false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200 && res.responseData) {
          this.dataSource = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalCount;
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
        } else {
          this.dataSource = [];
          this.totalRows = 0;
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
        this.spinner.hide();
      },
      error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
    })
  }

  onTransportType(val: any){
    this.regVehicleFrm.patchValue({
      state: '',
      district: '',
      number: '',
      series: ''
    });
    if(val == "Vehicle"){
      this.regVehicleFrm.controls['numberFormat'].setValidators([Validators.required]);
      this.regVehicleFrm.controls['state'].setValidators([Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(2), Validators.minLength(2)]);
      this.regVehicleFrm.controls['district'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(2), Validators.minLength(2)]);
      this.regVehicleFrm.controls['number'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(4), Validators.minLength(4)]);
    }else{
      alert("in else")
      this.regVehicleFrm.controls['numberFormat'].clearValidators();
      this.regVehicleFrm.controls['district'].clearValidators();
      this.regVehicleFrm.controls['state'].setValidators([Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(3), Validators.minLength(3)]);      
      this.regVehicleFrm.controls['number'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(5), Validators.minLength(5)]);
      this.regVehicleFrm.patchValue({
        numberFormat: 'New'
      });
      this.onNumberFormatChange(this.regVehicleFrm.value.numberFormat);
    }
    this.regVehicleFrm.controls['state'].updateValueAndValidity();
    this.regVehicleFrm.controls['district'].updateValueAndValidity();
    this.regVehicleFrm.controls['number'].updateValueAndValidity();
    this.regVehicleFrm.controls['numberFormat'].updateValueAndValidity();
  }

  onNumberFormatChange(val: any){
    alert("in fun")
    this.regVehicleFrm.patchValue({
      state: '',
      district: '',
      number: '',
      series: ''
    })
    if(val == "Old"){
      this.regVehicleFrm.controls['series'].clearValidators();
      this.regVehicleFrm.controls['district'].clearValidators();
      this.regVehicleFrm.controls['number'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(4), Validators.minLength(4)]);
      this.regVehicleFrm.controls['state'].setValidators([Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(3), Validators.minLength(3)]);      
    }else{
      this.regVehicleFrm.controls['district'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(2), Validators.minLength(2)]);
      this.regVehicleFrm.controls['series'].setValidators([Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(2), Validators.minLength(2)]);
      this.regVehicleFrm.controls['number'].setValidators([Validators.required, Validators.pattern(this.vs.onlyNumbers), Validators.maxLength(4), Validators.minLength(4)]);
      this.regVehicleFrm.controls['state'].setValidators([Validators.required, Validators.pattern(this.vs.onlyAlphabet), Validators.maxLength(2), Validators.minLength(2)]);      
    } 
    this.regVehicleFrm.controls['district'].updateValueAndValidity();
    this.regVehicleFrm.controls['series'].updateValueAndValidity();
    this.regVehicleFrm.controls['state'].updateValueAndValidity();
    this.regVehicleFrm.controls['number'].updateValueAndValidity();
  }

  onVehicleSearch(){
    this.pageNo = 1;
    this.paginator.pageIndex = 0;
    if(this.filterVehicleFrm.valid){
      this.getVehicleList();
    }
  }

  pageChanged(pg: any){
    this.pageNo = pg.pageIndex + 1;
    this.getVehicleList();
    this.onCancelRecord();
  }

  getStateNames(){
    this.stateNameArr = [];
    this.commonService.getState().subscribe({
      next: (response: any) => {
        this.stateNameArr = response;
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getDistrictNames(stId: any){
    this.districtNameArr = [];
    this.commonService.getDistrictByStateId(stId).subscribe({
      next: (response: any) => {
        this.districtNameArr = response;
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  onFileSelected(event: any, type: any){
    let selResult = event.target.value.split('.');
    var ImgExt = selResult.pop();
    if (ImgExt == "png" || ImgExt == "jpg" || ImgExt == "jpeg") {
      if(type == 'frontImg'){
        this.eventFrontImg = event;
        if (this.eventFrontImg.target.files && this.eventFrontImg.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.regVehicleFrm.patchValue({
              frontImage : event.target.result
            })
          }
          reader.readAsDataURL(event.target.files[0]);
        }    
      }else if(type == 'sideImg'){
        this.eventSideImg = event;
        if (this.eventSideImg.target.files && this.eventSideImg.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.regVehicleFrm.patchValue({
              sideImage : event.target.result
            })
          }
          reader.readAsDataURL(event.target.files[0]);
        }  
      }else if(type == 'numberPlateImg'){
        this.eventNumPlateImg = event;
        if (this.eventNumPlateImg.target.files && this.eventNumPlateImg.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.regVehicleFrm.patchValue({
              numberPlateImage : event.target.result
            })
          }
          reader.readAsDataURL(event.target.files[0]);
        }  
      }
    }else{
      this.commonMethod.matSnackBar("Only png, jpg, jpeg file format allowed.", 1);
    }
  }

  onUpload(){
    if(this.regVehicleFrm.value.frontImage && this.regVehicleFrm.value.sideImage && this.regVehicleFrm.value.numberPlateImage){
      this.commonService.uploadFile(this.eventFrontImg, this.eventSideImg, this.eventNumPlateImg, "png,jpg,jpeg").subscribe({
        next: (res: any) => {
          if(res.statusCode == 200 && res.responseData){
            this.regVehicleFrm.patchValue({
              frontImage : res.responseData.vehicleFrontSideImage,
              sideImage : res.responseData.vehicleSideImage,
              numberPlateImage : res.responseData.vehicleNumberImage
            })  
            this.isImageUplaod = true; 
            this.commonMethod.matSnackBar(res.statusMessage, 0);
          }else{
            this.isImageUplaod = false; 
            this.commonMethod.matSnackBar(res.statusMessage, 1);
          } 
        }
      })
    }else{
      this.commonMethod.matSnackBar("Please upload all images", 1);
      this.isImageUplaod = false;
    }
  }

  deleteUploadedImage(type: any){
    if(type == 'frontImg'){
      this.regVehicleFrm.patchValue({
        frontImage : ''
      }) 
      this.isImageUplaod = false;   
    }else if(type == 'sideImg'){
      this.regVehicleFrm.patchValue({
        sideImage : ''
      }) 
      this.isImageUplaod = false;
    }else if(type == 'numberPlateImg'){
      this.regVehicleFrm.patchValue({
        numberPlateImage : ''
      }) 
      this.isImageUplaod = false;
    }
  }

  editVehicleRecord(row: any){
    console.log(row)
    this.regVehicleFrm.patchValue({
      transportType: row.transportType,
      state: row.state,
      district: row.district,
      series: row.series,
      number: row.number,
      isBlock: row.isBlock,
      remark: row.remark,
      ownerName: row.ownerName,
      ownerMobileNumber: row.ownerMobileNumber,
      address: row.address,
      driverName: row.driverName,
      driverMobileNo: row.driverMobileNo,
      eTpMobileNumber: row.eTpMobileNumber,
      vehicleTypeId: row.vehicleTypeId,
      permitNo: row.permitNo,
      licenseNo: row.licenseNo,
      driverCompName: row.driverCompName,
      deviceId: row.deviceId,
      deviceSIMNo: row.deviceSIMNo,
      primaryTelecomProvider: row.primaryTelecomProvider,
      secondarySIMNo: row.secondarySIMNo,
      secondaryTelecomProvider: row.secondaryTelecomProvider,
      length: row.length,
      width: row.width,
      frontImage: row.frontImage,
      sideImage: row.sideImage,
      numberPlateImage: row.numberPlateImage
    })
  }

  saveUpdate(formData: any, action: any) {
    console.log(this.regVehicleFrm)
    console.log(this.isImageUplaod)
    this.isSubmitted = true;
    this.spinner.show();
    if (this.regVehicleFrm.invalid) {
      this.spinner.hide();
      return;
    }else{
      this.isSubmitted = false;
      if(this.isImageUplaod != true){
        this.spinner.hide();
        this.commonMethod.matSnackBar('Plaese upload images', 1);
      }else{
        var req = {
          "id": this.isEdit == true ? this.updateId : 0,
          ...this.regVehicleFrm.value,
          "length": parseInt(this.regVehicleFrm.value.length),
          "width": parseInt(this.regVehicleFrm.value.width),
          'isBlock': this.regVehicleFrm.value.isBlock ? this.regVehicleFrm.value.isBlock : false,
          "oldState": this.regVehicleFrm.value.transportType != 'Vehicle' ? this.regVehicleFrm.value.state : "",
          "oldNum": this.regVehicleFrm.value.transportType != 'Vehicle' ? this.regVehicleFrm.value.number : "",
          "createdBy": this.webStorageService.getUserId(),
          'flag': "",
          'pageName': "",
          // "modifiedBy": 0,
          "createdDate": new Date(),
          "modifiedDate": new Date(),
          // "isDeleted": true,
          // "vehicleRegistrationNo": "string",
          // "state": "string",
          // "district": "string",
          // "series": "string",
          // "number": "string",
          // "ownerName": "string",
          "capacity": 0,
          // "vehicleTypeId": 0,
          // "vehicleOwnerId": 0,
          // "ownerMobileNo": "string",
          // "driverName": "string",
          // "driverMobileNo": "string",
          // "address": "string",
          // "licenseNo": "string",
          // "permitNo": "string",
          "trainingDate": "2022-09-23T12:26:20.443Z",
          "serviceProvider": "",
          // "deviceId": "string",
          // "deviceCompanyId": 0,
          // "deviceSIMNo": "string",
          "activationKey": "",
          "activationKey1ExpireDate": "2022-09-23T12:26:20.443Z",
          "activationKey1LockOutCount": 0,
          "version": "",
          "registrationId": "",
          "transporterMobileNo": "",
          "transporterId": 0,
          "nfcTagId": "",
          "isRegisteredByOffice": true,
          "registeredBy": 0,
          "ownerAadharNo": 0,
          "ownerAadharFilePath": "",
          "taxFilePath": "",
          "insuranceFilePath": "",
          "permitFilePath": "",
          "certificateFilePath": "",
          "rlw": 0,
          "ulw": 0,
          "cc": 0,
          "receiptNo": "",
          "amount": 0,
          "applicationFormFilePath": "",
          "invoiceCounter": 0,
          "transportType": "",
          "remark": "",
          "originalDeviceId": "",
          "height": 0,
          "isVerified": true,
          "isForceValidateGPSDataConsistent": true,
          "forceValidateBy": 0,
          "forceValidateDate": "2022-09-23T12:26:20.443Z",
          "blockedBy": 0,
          "blockedDate": "2022-09-23T12:26:20.443Z",
          "isSuspicious": true,
          "suspiciousReason": "",
          "suspiciousDate": "2022-09-23T12:26:20.443Z",
          "manufacturerId": 0,
          "tenantId": "",
          "rfid": "",
          "mobileNo": "",
        }

        console.log(req)

        this.apiService.setHttp('post', "api/VehicleRegistration/SaveUpdateVehicleRegistration", false, req, false, 'WBMiningService');
        this.apiService.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode === 200) {
              this.spinner.hide();
              this.getVehicleList();
              this.onCancelRecord();
              this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
            } else {
              this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
            }
            this.spinner.hide();
          },
          error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
        })
      }
    }
  }

  onCancelRecord(){
    this.regVehicleFrm.reset();
    this.isEdit = false;
  }

}
