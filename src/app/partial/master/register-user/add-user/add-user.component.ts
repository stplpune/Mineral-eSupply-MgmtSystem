import { state } from '@angular/animations';

import { ConfigService } from 'src/app/configs/config.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  userFrm!: FormGroup;
  usertypearray: any[] = [];
  subusertypearray: any[] = [];
  districtArray: any[] = [];
  stateArray: any = [];
  editFlag: boolean = false;
  saveUpdateBtn = 'Save';
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    @Inject(MAT_DIALOG_DATA) public parentData: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.parentData)
    this.defaultForm();
    this.commonMethod.checkDataType(this.parentData) == true ? this.patchData() : this.getusertype();
  }

  defaultForm() {
    this.userFrm = this.fb.group({
      id: [0],
      fullName: ['', [Validators.required, Validators.pattern(this.validation.alphabetsWithSpace)]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.validation.valMobileNo)]],
      address: ['', [Validators.required, Validators.pattern(this.validation.alphaNumericWithSpace)]],
      emailId: ['', [Validators.pattern(this.validation.valEmailId)]],
      designation: ['', [Validators.required, Validators.pattern(this.validation.alphabetsWithSpace)]],
      userTypeId: ['', [Validators.required]],
      subUserTypeId: ['', [Validators.required]],
      stateId: [''],
      districtId: [''],
      flag: ['i'],
      createdBy: [1]
    });

  }
  patchData() {
    this.editFlag = true;
    this.saveUpdateBtn = 'Update';
    this.getusertype();
    this.userFrm.patchValue({
      fullName: this.parentData.fullName,
      mobileNo: this.parentData.mobileNo,
      address: this.parentData.address,
      emailId: this.parentData.emailId,
      designation: this.parentData.designation,
    })

  }

  get f(): any {
    return this.userFrm.controls;
  }

  clearAll() {
    this.formGroupDirective.resetForm();
    this.editFlag = true;
    this.saveUpdateBtn = 'Save';
    this.parentData = '';
  }

  saveUpdateData() {
    this.spinner.show();
    const formValue = this.userFrm.value;
    if (this.userFrm.invalid) {
      this.spinner.hide();
      return;
    }
    this.commonMethod.checkDataType(this.parentData) == true ? (formValue['id'] = this.parentData.id, formValue['flag'] = 'u') : (formValue['id'] = 0, formValue['flag'] = 'i');
    this.apiService.setHttp('post', "UserRegistration/SaveUpdateUser", false, formValue, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();
          formValue.flag == 'u' ? this.commonMethod.matSnackBar(res.statusMessage,1) : '';
          this.closeModal(formValue.flag);
          this.clearAll();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

  getusertype() {
    this.commonService.getuserType().subscribe({
      next: (response: any) => {
        this.usertypearray.push({ 'value': 0, 'text': 'Select User Type' }, ...response);
        this.editFlag ? (this.userFrm.controls['userTypeId'].setValue(this.parentData.userTypeId), this.getSubuserType()) : this.getState();

      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getSubuserType() {
    this.subusertypearray = [];
    const id = this.userFrm.value.userTypeId;
    this.commonService.getSubuserType(id).subscribe({
      next: (response: any) => {
        response.length == 1 ? (this.subusertypearray = response, this.userFrm.controls['subUserTypeId'].setValue(this.subusertypearray[0].value)) : this.subusertypearray.push({ 'value': 0, 'text': 'Select SubUser Type' }, ...response);
        this.editFlag ? (this.userFrm.controls['subUserTypeId'].setValue(this.parentData.subUserTypeId), this.getState()) : '';
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getState() {
    this.stateArray = [];
    this.commonService.getState().subscribe({
      next: (response: any) => {
        this.stateArray.push({ 'value': 0, 'text': 'Select State' }, ...response);
        this.editFlag ? (this.userFrm.controls['stateId'].setValue(this.parentData.stateId), this.getdistrict()) : '';
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  getdistrict() {
    this.districtArray = [];
    const id = this.userFrm.value.stateId;
    this.commonService.getDistrictByStateId(id).subscribe({
      next: (response: any) => {
        this.districtArray.push({ 'value': 0, 'text': 'Select District' }, ...response);
        this.editFlag ? (this.userFrm.controls['districtId'].setValue(this.parentData.districtId)) : '';
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

}
