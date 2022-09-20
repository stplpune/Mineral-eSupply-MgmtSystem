import { Component, ElementRef, Inject, NgZone, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PDFExcelService } from 'src/app/core/services/pdf-excel.service';
import { Observable, of, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ConfigService } from 'src/app/configs/config.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-coal-allocation',
  templateUrl: './coal-allocation.component.html',
  styleUrls: ['./coal-allocation.component.scss']
})
export class CoalAllocationComponent implements OnInit {

  verifyPANForm:FormGroup | any;
  

  coalAllocationRegiForm:FormGroup | any;
  applicationTypeArray = ['Individual', 'Organization'];
  hideIndividual: boolean = true;
  hideOrganization: boolean = false;
  organTypeArray: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  DesignationArray: any[] = [];
  applicationTypeName = 'Individual';

  panSymbolHide: boolean = false;
  aadharSymbolHide: boolean = false;
  gstSymbolHide: boolean = false;
  incCertiSymbolHide: boolean = false;
  SALBodyCertiSymbolHide: boolean = false;
  PDCertiSymbolHide: boolean = false;

  @ViewChild('fileInputPan', { static: false }) fileInputPan: ElementRef | any;
  @ViewChild('fileInputAadhar', { static: false }) fileInputAadhar: ElementRef | any;
  @ViewChild('fileInputGst', { static: false }) fileInputGst: ElementRef | any;
  @ViewChild('fileInputIC', { static: false }) fileInputIC: ElementRef | any;
  @ViewChild('fileInputSALBC', { static: false }) fileInputSALBC: ElementRef | any;
  @ViewChild('fileInputPDC', { static: false }) fileInputPDC: ElementRef | any;

  latitude: any;
  longitude: any;
  pinCode: any;
  geocoder: any;
  @ViewChild('search') public searchElementRef!: ElementRef;

  maxDate = new Date();


  constructor(
    public commonService: CommonMethodsService,
    private fb: FormBuilder,
    public validationService: FormsValidationService, 
    public callApiService: CallApiService,
    public errorSerivce: ErrorHandlerService,
    public commonApiCallService: CommonApiCallService,
    public webStorageService: WebStorageService,
    public fileUploadService: FileUploadService,
    public pdf_excelService:PDFExcelService, 
    public configService:ConfigService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,

  ) { }

  ngOnInit(): void {
    this.verifyPanForm();
    this.defaultMainForm();
    this.getState();
    this.getOrganizationtype();
    this.searchAddressToPincode();
  }

  
  get p() { return this.verifyPANForm.controls }
  verifyPanForm(){
    this.verifyPANForm = this.fb.group({  verifyPANNumber: ['',[Validators.required, Validators.pattern('[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}')]]})
  }

  get f() { return this.coalAllocationRegiForm.controls }
  defaultMainForm() {
    this.coalAllocationRegiForm = this.fb.group({  
      id: [0], 
      applicantName: ['',Validators.required],
      applicantMobileNo: [''],
      applicantEmailId: [''],
      organizationName: [''],
      organizationType: [''],
      organizationNumber: [''],
      organizationEmail: [''],
      contactPersonName: [''],
      contactPersonMobileName: [''],
      address: [''],
      pinCode: [''],
      stateId: [36],
      districtId: [''],
      applicationYear: [''],
      allocatedQty: [''],
      reasonForApply: [''],

      panNo: [''], 
      aadharNo: [''],
      gstNo: [''],
      // incorporationCerti_No: [''],
      incorporation_Date: [''],  
      districtRecometnLetter: [''],
    })
  }

  defaultDocSymbolHide() {
    this.panSymbolHide = false;
    this.aadharSymbolHide = false;
    this.gstSymbolHide = false;
    this.incCertiSymbolHide = false;
    this.SALBodyCertiSymbolHide = false;
    this.PDCertiSymbolHide = false;
  }

  defaultfilenativeElementClear() {
    if (this.fileInputPan?.nativeElement.value || this.fileInputAadhar?.nativeElement.value || this.fileInputGst?.nativeElement.value || this.fileInputIC?.nativeElement.value || this.fileInputSALBC?.nativeElement?.value || this.fileInputPDC?.nativeElement.value) {
      this.commonService.checkDataType(this.fileInputPan?.nativeElement.value) == true ? this.fileInputPan.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputAadhar?.nativeElement.value) == true ? this.fileInputAadhar.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputGst?.nativeElement.value) == true ? this.fileInputGst.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputIC?.nativeElement.value) == true ? this.fileInputIC.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputSALBC?.nativeElement.value) == true ? this.fileInputSALBC.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputPDC?.nativeElement.value) == true ? this.fileInputPDC.nativeElement.value = '' : '';
    }
  }

  verifyByPANNumber() {

    if (this.verifyPANForm.invalid) {
      return;
    }
  }

  applicationTypeCheck(flag: any) {
    this.applicationTypeName = flag;
    flag == 'Individual' ? (this.hideIndividual = true, this.hideOrganization = false) : (this.hideOrganization = true, this.hideIndividual = false);
    this.defaultDocSymbolHide();
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
        this.getDistrict(this.coalAllocationRegiForm.value.stateId);
      },
      error: (err => { this.errorSerivce.handelError(err) })
    })
  }

  getDistrict(stateId:any) {
    this.commonApiCallService.getDistrictByStateId(stateId).subscribe({
      next: (response: any) => {
        this.districtArray.push({ text: "Select District", value: 0 }, ...response);
      },
      error: (err => { this.errorSerivce.handelError(err) })
    })
  }

  onSubmit(){
    if(this.coalAllocationRegiForm.invalid){
      return
    }

    console.log(this.coalAllocationRegiForm.value)
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
          this.coalAllocationRegiForm.controls['pinCode'].setValue(this.pinCode);
        });
      });
    this.coalAllocationRegiForm.controls['address'].setValue(this.searchElementRef.nativeElement?.value);
  }

  //.........................................Address to get Pincode Code End Here ....................................//

  documentUpload(event: any, docTypeId: any, docTypeName: any) {
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, docTypeId,docTypeName, "png,jpg,jpeg,pdf", 5, 5000)
    console.log(documentUrl)
    documentUrl.subscribe({
      next: (ele: any) => {
        documentUrlUploaed = ele.responseData.documentWebURL;
        console.log(ele)
      },
    })
  }

}
