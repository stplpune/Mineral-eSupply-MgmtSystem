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

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-coal-allocation',
  templateUrl: './coal-allocation.component.html',
  styleUrls: ['./coal-allocation.component.scss']
})
export class CoalAllocationComponent implements OnInit {

  verifyPANNumber = new FormControl('');

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  bidderRegiForm:FormGroup | any;
  bidderTypeArray = ['Individual', 'Organization'];
  hideIndividual: boolean = true;
  hideOrganization: boolean = false;
  organTypeArray: any[] = [];
  districtArray: any[] = [];
  DesignationArray: any[] = [];
  bidderTypeName = 'Individual';

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

  ) { }

  ngOnInit(): void {
    this.defaultMainForm();
  }

  get f() { return this.bidderRegiForm.controls }

  defaultMainForm() {
    this.bidderRegiForm = this.fb.group({  
      id: [0],
      name: [''],
      mobile: [''],
      stateId: [''],
      districtId: [''],
      email: [''],
      address: [''],
      pinCode: [''],
      designation: [''],
      organizationTypeId: [''],
      contactPersonName: [''],
      contactPersonMobile: [''],

      accountHolderName: [''],
      accountNo: [''],
      bankName: [''],
      ifscCode: [''],
      branchName: [''],
      verfiedOTPId: [''],
      accountId: [0],

      panNo: [''], 
      aadharNo: [''],
      gstNo: [''],
      incorporationCerti_No: [''],
      incorporation_Date: [''],
      SALocalBodyCerti_No: [''],
      partnershipDeedCerti_No: [''],
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

}
