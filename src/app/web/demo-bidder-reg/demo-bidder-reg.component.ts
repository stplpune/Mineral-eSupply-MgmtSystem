import { Component, ElementRef, Inject, NgZone, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ExcelService } from 'src/app/core/services/pdf-excel.service';


@Component({
  selector: 'app-demo-bidder-reg',
  templateUrl: './demo-bidder-reg.component.html',
  styleUrls: ['./demo-bidder-reg.component.scss']
})
export class DemoBidderRegComponent implements OnInit {

  bidderRegiForm:FormGroup | any;

  constructor(
    public commonService: CommonMethodsService,
    private fb: FormBuilder,
    public validationService: FormsValidationService, 
    public callApiService: CallApiService,
    public errorSerivce: ErrorHandlerService,
    public commonApiCallService: CommonApiCallService,
    public webStorageService: WebStorageService,
    public fileUploadService: FileUploadService,
    public excelService:ExcelService

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

}
