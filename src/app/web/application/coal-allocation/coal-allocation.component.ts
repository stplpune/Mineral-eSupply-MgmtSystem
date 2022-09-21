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
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  applicationTypeArray = ['Individual', 'Organization'];
  hideIndividual: boolean = true;
  hideOrganization: boolean = false;
  organTypeArray: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  applicationTypeName = 'Individual';

  panSymbolHide: boolean = false;
  aadharSymbolHide: boolean = false;
  gstSymbolHide: boolean = false;
  incCertiSymbolHide: boolean = false;
  DRLSymbolHide: boolean = false;

  checkedDataflag: boolean = true;

  @ViewChild('fileInputPan', { static: false }) fileInputPan: ElementRef | any;
  @ViewChild('fileInputAadhar', { static: false }) fileInputAadhar: ElementRef | any;
  @ViewChild('fileInputGst', { static: false }) fileInputGst: ElementRef | any;
  @ViewChild('fileInputIC', { static: false }) fileInputIC: ElementRef | any;
  @ViewChild('fileInputDRL', { static: false }) fileInputDRL: ElementRef | any;


  latitude: any;
  longitude: any;
  pinCode: any;
  geocoder: any;
  @ViewChild('search') public searchElementRef!: ElementRef;

  maxDate = new Date();
  coalApplicationDocuments:any[]=[];


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
      name: ['',Validators.required],
      mobile: ['',Validators.required],
      email: ['',Validators.required],
      organizationType: [''],
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
    this.DRLSymbolHide = false;
  }

  defaultfilenativeElementClear() {
    if (this.fileInputPan?.nativeElement.value || this.fileInputAadhar?.nativeElement.value || this.fileInputGst?.nativeElement.value || this.fileInputIC?.nativeElement.value || this.fileInputDRL?.nativeElement?.value) {
      this.commonService.checkDataType(this.fileInputPan?.nativeElement.value) == true ? this.fileInputPan.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputAadhar?.nativeElement.value) == true ? this.fileInputAadhar.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputGst?.nativeElement.value) == true ? this.fileInputGst.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputIC?.nativeElement.value) == true ? this.fileInputIC.nativeElement.value = '' : '';
      this.commonService.checkDataType(this.fileInputDRL?.nativeElement.value) == true ? this.fileInputDRL.nativeElement.value = '' : '';
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
      error: (err => {  })
    })
  }

  onSubmit() {
    this.addDocumentNumber();
    this.addDocumentNumberNew();
    if (this.coalAllocationRegiForm.invalid) {
      window.scroll(0, 0);
      return;
    } else if (this.panSymbolHide != true) {
      this.commonService.matSnackBar("PAN Document is Required..!!!", 1);  
      this.commonService.scrollBar(400);
      return;
    } else if(this.coalAllocationRegiForm.value.contactPersonMobileName == this.coalAllocationRegiForm.value.applicantMobileNo){
      this.commonService.matSnackBar("Mobile Number & Contact Person Mobile No. should be different.", 1);
      return;
    }
    // else if (this.checkLoginOrNot == false ? (this.coalAllocationRegiForm.value.verfiedOTPId != this.mobileOtp) : '') {
    //   this.commonService.matSnackBar("Please Enter Valid Otp Field..!!!", 1);
    //   return;
    // }
    else {
      let formData = this.coalAllocationRegiForm.value;

      // let obj1 = {
      //   "createdBy": 0,
      //   "modifiedBy": 0,
      //   "createdDate": new Date,
      //   "modifiedDate": new Date,
      //   "isDeleted": false,
      //   "id": this.commonService.checkDataType(formData.id) == true ? formData.id : 0,
      //   "contactPersonName": this.commonService.checkDataType(formData.contactPersonName) == true ? formData.contactPersonName : '',
      //   "contactPersonMobile": this.commonService.checkDataType(formData.contactPersonName) == true ? formData.contactPersonMobile : '',
      //   "bidderType": this.bidderTypeName,
      //   "name": formData.name,
      //   "mobile": formData.mobile,
      //   "stateId": (this.checkLoginOrNot == true || (this.checkLoginOrNot == true ? this.localstorageService?.userTypeId() == 2 : '')) ? localstorData?.stateId : 1,
      //   "districtId": formData.districtId,
      //   "email": formData.email,
      //   "address": formData.address,
      //   "pinCode": formData.pinCode,
      //   "designation": this.designationName,
      //   "organizationTypeId": parseInt(formData.organizationTypeId) || 0,
      //   "verfiedOTPId": this.verfiedOTPId,
      //   "projectId": (this.checkLoginOrNot == true || (this.checkLoginOrNot == true ? this.localstorageService?.userTypeId() == 2 : '')) ? localstorData?.projectId : 2,
      //   "designationId": formData.designation || 0,
      //   "bidderRefundAccount": (this.checkLoginOrNot == true ? this.localstorageService?.userTypeId() == 1 : '') ? null : bidderRefundAccount,
      //   "bidderDocumentslst": this.bidderDocumentListArray
      // }

      let typeObj:any;
      if(this.applicationTypeName == 'Individual'){
       typeObj = {
        "applicantName": formData.name,
        "applicantMobileNo": formData.mobile,
        "applicantEmailId": formData.email,
       }
      }else{
        typeObj = {
        "organizationName": formData.name,
        "organizationNumber": formData.mobile,
        "organizationEmail": formData.email,
        "contactPersonName": formData.contactPersonName,
        "contactPersonMobileName": formData.contactPersonMobileName,
        }
      }

      let obj = {
        "id": formData.id,
        "applicationType": this.applicationTypeName == 'Individual' ? 1 : 2,
        "address": formData.address,
        "pinCode": formData.pinCode,
        "stateId": formData.stateId || 0,
        "districtId": formData.districtId || 0,
        "applicationYear": formData.applicationYear || 0,
        "allocatedQty": formData.allocatedQty || 0,
        "reasonForApply": formData.reasonForApply,
        "coalApplicationDocuments": this.coalApplicationDocuments
      }

      let finalResult = Object.assign(obj,typeObj);
      let formType = 'POST';
      this.callApiService.setHttp(formType, 'CoalApplication/SaveCoalApplication', false, JSON.stringify(finalResult), false, 'WBMiningService');
      this.callApiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.commonService.matSnackBar(res.statusMessage, 0);
          this.verifyPanForm();
          this.defaultDocSymbolHide();
          // this.sentOtpText = 'Send OTP';
          this.clearForm();
        } else {
          this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  clearForm() {
      this.coalAllocationRegiForm.reset();
      this.formDirective && this.formDirective.resetForm();
      this.defaultMainForm();
     // this.PartnershipDeedCerti_Hide = false;
      this.defaultDocSymbolHide();
      this.coalApplicationDocuments = [];
      this.defaultfilenativeElementClear();
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

   // ...........................................  Document Upload Code Start Here ......................................//


  documentUpload(event: any, documentTypeId: any, docTypeName: any) {
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, documentTypeId,docTypeName, "png,jpg,jpeg,pdf", 5, 5000)
    documentUrl.subscribe({
      next: (ele: any) => {
        documentUrlUploaed = ele.responseData.documentWebURL;
        if (documentUrlUploaed != null) {
          let obj = {
              "documentTypeId": documentTypeId,
              "documentName": docTypeName,
              "documentNo": '',
              "documentPath": documentUrlUploaed,
              "documentData": documentUrlUploaed
          }
          this.checkUniqueData(obj, documentTypeId);
        }
      },
    })
  }

  checkUniqueData(obj: any, documentTypeId: any) { //Check Unique Data then Insert or Update
    this.checkedDataflag = true;
    if (this.coalApplicationDocuments?.length <= 0) {
      this.coalApplicationDocuments.push(obj);
      this.checkedDataflag = false;
    } else {
      this.coalApplicationDocuments.map((ele: any, index: any) => {
        if (ele.documentTypeId == documentTypeId) {
          this.coalApplicationDocuments[index] = obj;
          this.checkedDataflag = false;
        }
      })
    }
    this.checkedDataflag && this.coalApplicationDocuments?.length >= 1 ? this.coalApplicationDocuments.push(obj) : '';
    this.documentSymbolHide();
  }

  documentSymbolHide() {
    if (this.coalApplicationDocuments?.length > 0) {
      this.coalApplicationDocuments.map((ele: any) => {
        switch (ele.documentName) {
          case 'PAN': this.panSymbolHide = true; break;
          case 'Aadhar': this.aadharSymbolHide = true; break; 
          case 'GST': this.gstSymbolHide = true; break;
          case 'Incorporation Certificate': this.incCertiSymbolHide = true; break;
          case 'District Recommendation Letter': this.DRLSymbolHide = true; break;
          default:
        }
      })
    }
  }

  deleteDocument(flag: any) {
    this.coalApplicationDocuments.splice(this.coalApplicationDocuments.findIndex(a => a.documentTypeId === flag), 1);
    switch (flag) {
      case 1: this.panSymbolHide = false, this.fileInputPan.nativeElement.value = ''; break;
      case 2: this.aadharSymbolHide = false, this.fileInputAadhar.nativeElement.value = ''; break;
      case 3: this.gstSymbolHide = false, this.fileInputGst.nativeElement.value = ''; break;
      case 4: this.incCertiSymbolHide = false, this.fileInputIC.nativeElement.value = ''; break;
      case 5: this.DRLSymbolHide = false, this.fileInputDRL.nativeElement.value = ''; break;
      default:
    }
  }

  viewDocument(flag: any) {
    this.coalApplicationDocuments.find((ele: any) => {
      if (ele.documentTypeId == flag) {
        window.open(ele.documentPath, '_blank');
      }
    })
  }

  //..... Document Number Code Start Here...... //

  addDocumentNumber() { // Add Document Number In coalApplicationDocuments
    const controls = this.coalAllocationRegiForm.controls;
    this.coalApplicationDocuments.map((ele: any) => {
      if (controls['panNo'].valid && ele.documentTypeId == 1) {
        ele.docNo = this.coalAllocationRegiForm.value.panNo.toUpperCase();
      } else if (controls['aadharNo'].valid && ele.documentTypeId == 2) {
        ele.docNo = this.coalAllocationRegiForm.value.aadharNo;
      } else if (controls['gstNo'].valid && ele.documentTypeId == 3) {
        ele.docNo = this.coalAllocationRegiForm.value.gstNo.toUpperCase();
      } else if (controls['incorporation_Date'].valid && ele.documentTypeId == 4) {
        ele.docNo = this.coalAllocationRegiForm.value.incorporation_Date.toUpperCase();
      } else if (controls['districtRecometnLetter'].valid && ele.documentTypeId == 5) {
        ele.docNo = this.coalAllocationRegiForm.value.districtRecometnLetter;
      }
    })
  }

  addDocumentNumberNew() { //is it not Upload document file then push obj only document Number
    let Aadhar: boolean = true;
    let GST: boolean = true;
    let IncorCerti: boolean = true;
    let distRecoLetter: boolean = true;

    this.coalApplicationDocuments.map((ele: any) => {
      switch (ele.documentName) {
        case 'Aadhar': Aadhar = false; break;
        case 'GST': GST = false; break;
        case 'Incorporation Certificate': IncorCerti = false; break;
        case 'District Recommendation Letter': distRecoLetter = false; break;
        default:
      }
    })

    const controls = this.coalAllocationRegiForm.controls;
    if (controls['aadharNo'].valid && this.coalAllocationRegiForm.value.aadharNo != '' && Aadhar) {
      this.documentNumberObj(this.coalAllocationRegiForm.value.aadharNo, 2);
    }
    if (controls['gstNo'].valid && this.coalAllocationRegiForm.value.gstNo != '' && GST) {
      this.documentNumberObj(this.coalAllocationRegiForm.value.gstNo, 3);
    }
    if (controls['incorporation_Date'].valid && this.coalAllocationRegiForm.value.incorporation_Date != '' && IncorCerti) {
      this.documentNumberObj(this.coalAllocationRegiForm.value.incorporation_Date, 4);
    }
    if (controls['districtRecometnLetter'].valid && this.coalAllocationRegiForm.value.districtRecometnLetter != '' && distRecoLetter) {
      this.documentNumberObj(this.coalAllocationRegiForm.value.districtRecometnLetter, 5);
    }
  }

  documentNumberObj(docNo: any, documentTypeId: any) {
    let obj = {
      "documentTypeId": documentTypeId,
      "documentName": '',
      "documentNo": docNo,
      "documentPath": '',
      "documentData": ''
    }
    this.checkUniqueData(obj, documentTypeId);
  }
  //..... Document Number Code End Here...... //

  // ...........................................  Document Upload Code End Here ......................................//

  // clearOnBlurValue(flag:any){
  //   let subject:any = /^0+$/;
  //  if(flag == 'incorporation_Date' && this.coalAllocationRegiForm.value.incorporation_Date.match(subject)){
  //     this.coalAllocationRegiForm.controls['incorporation_Date'].setValue('');
  //   }
  //  }


}
