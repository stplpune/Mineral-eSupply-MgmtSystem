import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { PDFExcelService } from 'src/app/core/services/pdf-excel.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { MapsAPILoader } from '@agm/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-consumer-registration',
  templateUrl: './consumer-registration.component.html',
  styleUrls: ['./consumer-registration.component.scss']
})
export class ConsumerRegistrationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterForm: FormGroup | any;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  highlightedRow: any;
  dataSource: any;
  displayedColumns: string[] = ['srno', 'consumerName', 'mobileNo', 'consumerTypeId', 'emailId', 'consumerDocuments', 'action'];

  consumerRegiForm: FormGroup | any;
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  applicationTypeArray = ['Individual', 'Organization'];
  applicationTypeFilterArray = ['All', 'Individual', 'Organization'];
  hideIndividual: boolean = true;
  hideOrganization: boolean = false;
  organTypeArray: any[] = [];
  stateArray: any[] = [];
  stateFilterArray: any[] = [];
  districtArray: any[] = [];
  yearArray: any[] = [];
  btnText = 'Submit';

  latitude: any;
  longitude: any;
  pinCode: any;
  geocoder: any;
  @ViewChild('search') public searchElementRef!: ElementRef;

  @ViewChild('fileInputPan', { static: false }) fileInputPan: ElementRef | any;
  @ViewChild('fileInputGst', { static: false }) fileInputGst: ElementRef | any;
  @ViewChild('fileInputDRL', { static: false }) fileInputDRL: ElementRef | any;

  panSymbolHide: boolean = false;
  gstSymbolHide: boolean = false;
  DRLSymbolHide: boolean = false;
  checkedDataflag: boolean = true;
  consumerDocuments: any[] = [];
  getEditConsumerRegArray: any;


  constructor(
    public commonService: CommonMethodsService,
    private fb: FormBuilder,
    public validationService: FormsValidationService,
    public callApiService: CallApiService,
    public errorSerivce: ErrorHandlerService,
    public commonApiCallService: CommonApiCallService,
    public webStorageService: WebStorageService,
    public fileUploadService: FileUploadService,
    public pdf_excelService: PDFExcelService,
    public configService: ConfigService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.defaultFilterForm();
    this.getConsumerRegistration();
    this.defaultMainForm();
    this.getState();
    // this.getStateFilter();
    this.getOrganizationtype();
    this.getyearDropDown();
    this.searchAddressToPincode();
  }

  //........................ filter Code Start Here ..................................//

  defaultFilterForm() {
    this.filterForm = this.fb.group({
      consumerType: [0],
      stateId: [0],
      searchText: [''],
    })
  }

  getConsumerRegistration() {
    let formData = this.filterForm.value;
    let obj = 'Textsearch=' + formData.searchText?.trim() + '&ConsumerTypeId=' + parseInt(formData.consumerType) + '&StateId=' + formData.stateId + '&pageno=' + this.pageNumber + '&pagesize=' + this.pagesize
    this.callApiService.setHttp('get', "api/ConsumerRegistration/GetConsumerDetails?" + obj, false, false, false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.responseData1) {
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
          this.totalRows = res.responseData.responseData2.totalCount;
          this.totalRows > 10 && this.pageNumber == 1 ? this.paginator?.firstPage() : '';
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.dataSource = [];
          this.commonService.matSnackBar(res.statusMessage, 0);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.clearForm();
    this.getConsumerRegistration();
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
        this.deleteConsumer();
      }
    })
  }

  deleteConsumer() {  // this.highlightedRow == id
    let obj = {
      "id": this.highlightedRow,
      "deletedBy": 1
    }

    this.callApiService.setHttp('DELETE', "api/ConsumerRegistration/DeleteConsumer", false, obj, false, 'WBMiningService');
    this.callApiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.commonService.matSnackBar(res.statusMessage, 0);
          this.pageNumber = 1;
          this.getConsumerRegistration();
          this.clearForm();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);;
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  //........................ filter Code End Here ..................................//

  get f() { return this.consumerRegiForm.controls }

  defaultMainForm() {
    this.consumerRegiForm = this.fb.group({
      id: [0],
      stateId: [36],
      districtId: [''],
      consumerTypeId: ['', Validators.required],
      organizationTypeId: [''],
      consumerName: ['', [Validators.required, Validators.pattern(this.validationService.valName)]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern(this.validationService.valEmailId)]],
      address: ['', [Validators.required, Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
      pinCode: ['', [Validators.required, Validators.pattern(this.validationService.valPinCode)]],
      contactPersonName: [''],
      contactPersonMobileNo: [''],
      mobileNo: ['', [Validators.required, Validators.pattern(this.validationService.valMobileNo)]],
      allotmentYear: [new Date().getFullYear(), [Validators.required]],
      allocatedQty: ['', [Validators.required]],
      flag: ['i'],

      panNo: ['', [Validators.required, Validators.pattern(this.validationService.vaPanNo)]],
      gstNo: ['', [Validators.required]],
      districtRecometnLetter: ['', [Validators.required]],
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

  consumerTypeCheck(flag: any) {
    flag == 'Individual' ? (this.hideIndividual = true, this.hideOrganization = false) : (this.hideOrganization = true, this.hideIndividual = false);
    // this.defaultDocSymbolHide();
    this.addRemoveVali_ApplicationType(flag);
    this.addRemoveValiDistrict(this.consumerRegiForm.value.stateId);
  }

  defaultDocSymbolHide() {
    this.panSymbolHide = false;
    this.gstSymbolHide = false;
    this.DRLSymbolHide = false;
  }

  defaultfilenativeElementClear() {
    if (this.fileInputPan?.nativeElement.value || this.fileInputGst?.nativeElement.value || this.fileInputDRL?.nativeElement?.value) {
      this.commonService.checkDataType(this.fileInputPan?.nativeElement.value) == true ? this.fileInputPan.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputGst?.nativeElement.value) == true ? this.fileInputGst.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputDRL?.nativeElement.value) == true ? this.fileInputDRL.nativeElement.value = '' : '';
    }
  }

  addRemoveVali_ApplicationType(flag: any) {
    if (flag == 'Individual') {
      this.consumerRegiForm.controls['organizationTypeId'].setValue('');
      this.consumerRegiForm.controls['organizationTypeId'].clearValidators();
      this.consumerRegiForm.controls['organizationTypeId'].updateValueAndValidity();
      this.consumerRegiForm.controls['contactPersonName'].setValue('');
      this.consumerRegiForm.controls['contactPersonMobileNo'].setValue('');
    } else {
      this.consumerRegiForm.controls["organizationTypeId"].setValidators(Validators.required);
      this.consumerRegiForm.controls["organizationTypeId"].updateValueAndValidity();
    }
  }

  addRemoveValiDistrict(flag: any) {
    if (flag == 36) {
      this.consumerRegiForm.controls["districtId"].setValidators(Validators.required);
      this.consumerRegiForm.controls["districtId"].updateValueAndValidity();
    } else {
      this.consumerRegiForm.controls['districtId'].setValue('');
      this.consumerRegiForm.controls['districtId'].clearValidators();
      this.consumerRegiForm.controls['districtId'].updateValueAndValidity();
    }
  }

  getOrganizationtype() {
    this.commonApiCallService.getOrganizationType().subscribe({
      next: (response: any) => {
        this.organTypeArray.push({ text: "Select Organization Type", value: 0 }, ...response);
      },
      error: (err => { this.errorSerivce.handelError(err) })
    })
  }

  getState() {
    this.commonApiCallService.getState().subscribe({
      next: (response: any) => {
        this.stateArray.push({ text: "Select State", value: 0 }, ...response);
        this.stateFilterArray.push({ text: "All", value: 0 }, ...response);
        this.getDistrict(this.consumerRegiForm.value.stateId);
        this.addRemoveValiDistrict(this.consumerRegiForm.value.stateId);
      },
      error: (err => { this.errorSerivce.handelError(err) })
    })
  }

  // getStateFilter() {
  //   this.commonApiCallService.getState().subscribe({
  //     next: (response: any) => {
  //       this.stateFilterArray.push({ text: "All", value: 0 }, ...response);
  //       this.getDistrict(this.consumerRegiForm.value.stateId);
  //       this.addRemoveValiDistrict(this.consumerRegiForm.value.stateId);
  //     },
  //     error: (err => { this.errorSerivce.handelError(err) })
  //   })
  // }

  getDistrict(stateId: any) {
    this.commonApiCallService.getDistrictByStateId(stateId).subscribe({
      next: (response: any) => {
        this.districtArray.push({ text: "Select District", value: 0 }, ...response);
      },
      error: (err => { })
    })
  }

  // verifyPAN_Number_Inside() {  // Verify PAN Exist Or Not
  //   if (this.consumerRegiForm.controls['panNo'].status == 'VALID') {
  //     this.callApiService.setHttp('get', "CoalApplication/GetCoalApplicationDetailsUsingPAN?panNumber=" + this.consumerRegiForm.value.panNo, false, false, false, 'WBMiningService');
  //     this.callApiService.getHttp().subscribe({
  //       next: (res: any) => {
  //         if (res.statusCode == 200) {
  //           this.commonService.matSnackBar(res.statusMessage, 1);
  //           this.consumerRegiForm.controls['panNo'].setValue('');
  //         } else {
  //           this.commonService.matSnackBar(res.statusMessage, 0);
  //         }
  //       },
  //       error: ((error: any) => { this.errorSerivce.handelError(error.status) })
  //     })
  //   }
  // }

  onSubmit() {
    this.addDocumentNumber();
    this.addDocumentNumberNew();
    let formData = this.consumerRegiForm.value;

    if (this.consumerRegiForm.invalid) {
      return;
    } else if (this.panSymbolHide != true) {
      this.commonService.matSnackBar("PAN Document is Required..", 1);
      return;
    } else if (this.gstSymbolHide != true) {
      this.commonService.matSnackBar("GST Document is Required..", 1);
      return;
    } else if (this.DRLSymbolHide != true) {
      this.commonService.matSnackBar("District Recommendation Letter Document is Required..", 1);
      return;
    } else if (formData.contactPersonName == formData.mobileNo) {
      this.commonService.matSnackBar("Mobile Number & Contact Person Mobile No. should be different.", 1);
      return;
    } else {

      let obj = {
        "id": formData?.id,
        "stateId": formData.stateId,
        "districtId": formData.districtId,
        "consumerTypeId": formData.consumerTypeId == 'Individual' ? 1 : 2,
        "organizationTypeId": parseInt(formData.organizationTypeId) || 0,
        "consumerName": formData.consumerName,
        "emailId": formData.emailId,
        "address": formData.address,
        "pinCode": formData.pinCode,
        "contactPersonName": formData.contactPersonName || '',
        "contactPersonMobileNo": formData.contactPersonMobileNo || '',
        "mobileNo": formData.mobileNo,
        "allotmentYear": formData.allotmentYear,
        "allocatedQty": parseInt(formData.allocatedQty),
        "createdBy": this.webStorageService.getUserId(),
        "createdDate": new Date(),
        "modifiedBy": this.webStorageService.getUserId(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "flag": formData.flag,
        "consumerDocuments": this.consumerDocuments
      }
     
      let TypeUrl = this.btnText == 'Update' ? 'PUT' : 'POST' ;

      this.callApiService.setHttp(TypeUrl, 'api/ConsumerRegistration', false, obj, false, 'WBMiningService');
      this.callApiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.commonService.matSnackBar(res.statusMessage, 0);
          this.getConsumerRegistration();
          this.clearForm();
        } else {
          this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  editConsumerRegForm(data: any) { // Patch Data
    this.btnText = 'Update';
    this.getEditConsumerRegArray = data;
    this.consumerTypeCheck(data?.consumerTypeId == 1 ? 'Individual' : 'Organization');
    this.consumerRegiForm.patchValue({
      id: data?.id,
      stateId: data?.stateId,
      districtId: data?.districtId,
      consumerTypeId: data?.consumerTypeId == 1 ? 'Individual' : 'Organization',
      organizationTypeId: data?.organizationTypeId,
      consumerName: data?.consumerName,
      emailId: data?.emailId,
      address: data?.address,
      pinCode: data?.pinCode,
      contactPersonName: data?.contactPersonName,
      contactPersonMobileNo: data?.contactPersonMobileNo,
      mobileNo: data?.mobileNo,
      allotmentYear: data?.allotmentYear,
      allocatedQty: data?.allocatedQty,
      flag: 'u',
    })
    this.consumerDocuments = [...data?.consumerDocuments];
    // this.consumerDocuments = data?.consumerDocuments;
    this.documentSymbolHide();
    this.consumerDocuments.map((ele: any) => {
      switch (ele.documentTypeId) {
        case 1: this.consumerRegiForm.controls['panNo'].setValue(ele.documentNo); break;
        case 3: this.consumerRegiForm.controls['gstNo'].setValue(ele.documentNo); break;
        case 5: this.consumerRegiForm.controls['districtRecometnLetter'].setValue(ele.documentNo); break;
        default:
      }
    });
  }

  clearForm() {
    this.consumerRegiForm.reset();
    this.formDirective && this.formDirective.resetForm();
    this.btnText = 'Submit';
    this.defaultMainForm();
    this.defaultDocSymbolHide();
    this.consumerDocuments = [];
    this.defaultfilenativeElementClear();
    this.addRemoveValiDistrict(this.consumerRegiForm.value.stateId);
  }

  //.........................................Address to get Pincode Code Start Here ..................................................//

  searchAddressToPincode() {
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getPincode();
        });
      });
    });
  }

  getPincode() {
    this.geocoder.geocode(
      { location: { lat: this.latitude, lng: this.longitude, } },
      (results: any) => {
        results[0].address_components.forEach((element: any) => {
          this.pinCode = element.long_name;
          this.consumerRegiForm.controls['pinCode'].setValue(this.pinCode);
        });
      });
    this.consumerRegiForm.controls['address'].setValue(this.searchElementRef.nativeElement?.value);
  }

  //.........................................Address to get Pincode Code End Here ....................................//

  // ...........................................  Document Upload Code Start Here ......................................//


  documentUpload(event: any, documentTypeId: any, docTypeName: any) {
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, documentTypeId, docTypeName, "png,jpg,jpeg,pdf", 5, 5000)
    documentUrl.subscribe({
      next: (ele: any) => {
        documentUrlUploaed = ele.responseData.documentWebURL;
        if (documentUrlUploaed != null) {
          let obj = {
            "id": 0,
            "consumerId": 0,
            "documentTypeId": documentTypeId,
            "documentName": docTypeName,
            "documentNo": '',
            "documentPath": documentUrlUploaed,
            "createdBy": this.webStorageService.getUserId(),
            "createdDate": new Date(),
            "modifiedBy": this.webStorageService.getUserId(),
            "modifiedDate": new Date(),
            "isDeleted": false
          }
          this.checkUniqueData(obj, documentTypeId);
        }
      },
    })
  }

  checkUniqueData(obj: any, documentTypeId: any) { //Check Unique Data then Insert or Update
    this.checkedDataflag = true;
    if (this.consumerDocuments?.length <= 0) {
      this.consumerDocuments.push(obj);
      this.checkedDataflag = false;
    } else {
      this.consumerDocuments.map((ele: any, index: any) => {
        if (ele.documentTypeId == documentTypeId) {
          this.consumerDocuments[index] = obj;
          this.checkedDataflag = false;
        }
      })
    }
    this.checkedDataflag && this.consumerDocuments?.length >= 1 ? this.consumerDocuments.push(obj) : '';
    this.documentSymbolHide();
  }

  documentSymbolHide() {
    if (this.consumerDocuments?.length > 0) {
      this.consumerDocuments.map((ele: any) => {
        switch (ele.documentName) {
          case 'PAN': this.panSymbolHide = true; break;
          case 'GST': this.gstSymbolHide = true; break;
          case 'District Recommendation Letter': this.DRLSymbolHide = true; break;
          default:
        }
      })
    }
  }

  deleteDocument(flag: any) {
    this.consumerDocuments.splice(this.consumerDocuments.findIndex(a => a.documentTypeId === flag), 1);
    switch (flag) {
      case 1: this.panSymbolHide = false, this.fileInputPan.nativeElement.value = ''; break;
      case 3: this.gstSymbolHide = false, this.fileInputGst.nativeElement.value = ''; break;
      case 5: this.DRLSymbolHide = false, this.fileInputDRL.nativeElement.value = ''; break;
      default:
    }
  }

  viewDocument(flag: any) {
    this.consumerDocuments.find((ele: any) => {
      if (ele.documentTypeId == flag) {
        window.open(ele.documentPath, '_blank');
      }
    })
  }

  //..... Document Number Code Start Here...... //

  addDocumentNumber() { // Add Document Number In consumerDocuments
    const controls = this.consumerRegiForm.controls;
    this.consumerDocuments.map((ele: any) => {
      if (controls['panNo'].valid && ele.documentTypeId == 1) {
        ele.documentNo = this.consumerRegiForm.value.panNo.toUpperCase();
      } else if (controls['gstNo'].valid && ele.documentTypeId == 3) {
        ele.documentNo = this.consumerRegiForm.value.gstNo.toUpperCase();
      } else if (controls['districtRecometnLetter'].valid && ele.documentTypeId == 5) {
        ele.documentNo = this.consumerRegiForm.value.districtRecometnLetter;
      }
    })
  }

  addDocumentNumberNew() { //is it not Upload document file then push obj only document Number

    let GST: boolean = true;
    let distRecoLetter: boolean = true;

    this.consumerDocuments.map((ele: any) => {
      switch (ele.documentName) {
        case 'GST': GST = false; break;
        case 'District Recommendation Letter': distRecoLetter = false; break;
        default:
      }
    })

    const controls = this.consumerRegiForm.controls;
    if (controls['gstNo'].valid && this.consumerRegiForm.value.gstNo != '' && GST) {
      this.documentNumberObj(this.consumerRegiForm.value.gstNo, 3);
    }
    if (controls['districtRecometnLetter'].valid && this.consumerRegiForm.value.districtRecometnLetter != '' && distRecoLetter) {
      this.documentNumberObj(this.consumerRegiForm.value.districtRecometnLetter, 5);
    }
  }

  documentNumberObj(docNo: any, documentTypeId: any) {
    let obj = {
      "id": 0,
      "consumerId": 0,
      "documentTypeId": documentTypeId,
      "documentName": '',
      "documentNo": docNo,
      "documentPath": '',
      "createdBy": this.webStorageService.getUserId(),
      "createdDate": new Date(),
      "modifiedBy": this.webStorageService.getUserId(),
      "modifiedDate": new Date(),
      "isDeleted": false
    }
    this.checkUniqueData(obj, documentTypeId);
  }
  //..... Document Number Code End Here...... //

  // ...........................................  Document Upload Code End Here ......................................//

}

export interface PeriodicElement {
  srno: number;
  state: string;
  consumer_name: string;
  consumer_type: string;
  mobile_no: number;
  email: string;
  pan: number;
  action: string;
}


