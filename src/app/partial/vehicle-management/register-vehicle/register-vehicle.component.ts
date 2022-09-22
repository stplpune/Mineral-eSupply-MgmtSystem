import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
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
  isEdit: boolean = false;
  updateId: any;
  totalRows: any;
  pageNo = 1;
  pageSize = 10;
  displayedColumns: string[] = ['rowNumber', 'collieryName', 'districtName', 'districtName1', 'action',];
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  dataSource: any [] = [];

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
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.createVehicleForm();
    this.createFilterForm();
    this.getStateNames();
    // this.getVehicleList();
  }

  createFilterForm(){
    this.filterVehicleFrm = this.fb.group({
      verificationStatus: [''],
      textSearch: ['']
    })

  }

  createVehicleForm(){
    this.regVehicleFrm = this.fb.group({
      transportType: ['', [Validators.required]],
      numberFormat: ['', [Validators.required]],
      number: ['', [Validators.required]],
      isBlock: [''],
      ownerName: ['', [Validators.required, Validators.pattern(this.vs.alphabetsWithSpace)]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(this.vs.alphaNumericWithSpace)]],
      driverName: ['', [Validators.required, Validators.pattern(this.vs.alphabetsWithSpace)]],
      driverMobileNo: ['', [Validators.required, Validators.pattern(this.vs.valMobileNo)]],
      eTpMobileNumber: ['', [Validators.pattern(this.vs.valMobileNo)]],
      vehicleTypeId: [''],
      permitNo: [''],
      licenseNo: [''],
      driverCompName: [''],
      deviceId: [''],
      deviceSIMNo: [''],
      secondarySIMNo: [''],
      primaryTelecomProvider: [''],
      secondaryTelecomProvider: [''],
      length: [''],
      width: [''],
      otp: ['']
    })
  }

  getQueryString(){
    let str = "?pageno=" + this.pageNo + "&pagesize=" + this.pageSize;
    this.filterVehicleFrm && this.filterVehicleFrm.value.verificationStatus && (str += "&DistrictId=" + this.filterVehicleFrm.value.verificationStatus);
    this.filterVehicleFrm && this.filterVehicleFrm.value.textSearch && (str += "&Search=" + this.filterVehicleFrm.value.textSearch);
    return str;
  }

  getVehicleList(){
    this.spinner.show();
    this.apiService.setHttp('get', "CollieryMaster" + this.getQueryString(), false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.dataSource = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalCount;
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
  }

  getStateNames(){
    this.apiService.setHttp('get', "DropdownService/GetStateDetails", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.stateNameArr = res.responseData;
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getDistrictNames(stId: any){
    this.apiService.setHttp('get', "DropdownService/GetDistrictDetails?stateId=" + stId, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.districtNameArr = res.responseData;
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  saveUpdate(formData: any, action: any) {
    this.spinner.show();
    if (this.regVehicleFrm.invalid) {
      this.spinner.hide();
      return;
    }else{
      var req = {
        "id": this.isEdit == true ? this.updateId : 0,
        ...this.regVehicleFrm.value
      }

      console.log(req)

      // this.apiService.setHttp('post', "CollieryMaster", false, req, false, 'WBMiningService');
      // this.apiService.getHttp().subscribe({
      //   next: (res: any) => {
      //     if (res.statusCode === 200) {
      //       this.spinner.hide();
      //       this.getVehicleList();
      //       // this.onCancelRecord();
      //       this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
      //     } else {
      //       this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
      //     }
      //   },
      //   error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
      // })
    }
  }

}
