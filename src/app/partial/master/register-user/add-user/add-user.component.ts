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
  usertypearray: any []= [];
  subusertypearray: any [] =[];
  districtArray: any []=[];
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  stateArray: any=[];
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService:CommonApiCallService,
    @Inject(MAT_DIALOG_DATA) public parentData: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.parentData)
    this.defaultForm();
  }

  defaultForm() {
    this.userFrm = this.fb.group({
      id: [0],
      fullName: ['', [Validators.required, Validators.pattern(this.validation.alphabetsWithSpace)]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.validation.valMobileNo)]],
      address: ['', [Validators.required, Validators.pattern(this.validation.alphaNumericWithSpace)]],
      emailId: ['',[Validators.pattern(this.validation.valEmailId)]],
      designation: ['', [Validators.required,Validators.pattern(this.validation.alphabetsWithSpace)]],
      userTypeId: ['', [Validators.required]],
      subUserTypeId: ['', [Validators.required]],
      stateId: [''],
      districtId: [''],
      flag: ['i']
    });
    this.getusertype()
  }

  get f(): any {
    return this.userFrm.controls;
  }

  clearAll() {
    this.formGroupDirective.resetForm();
  }

  saveUpdateData(){
    this.spinner.show();
    const formValue = this.userFrm.value;
    if (this.userFrm.invalid) {
      this.spinner.hide();
      return;
    }
    if(this.commonMethod.checkDataType(this.parentData) == true ){
      formValue['id'] = this.parentData.id;
      formValue['flag'] = 'u';
    }

    this.apiService.setHttp('post', "UserRegistration/SaveUpdateUser" , false, formValue, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.closeModal('Yes');
          this.clearAll();
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  closeModal(flag?:any){
    this.dialogRef.close(flag);
  }

getusertype(){
  this.commonService.getuserType().subscribe({
    next: (response: any) => {
     this.usertypearray.push({ 'value': '', 'text': 'Select User Type' }, ...response);
     this.getState();
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

getSubuserType(){
  this.subusertypearray =[];
  const id =this.userFrm.value.userTypeId;
  this.commonService.getSubuserType(id).subscribe({
    next: (response: any) => {
      response.length == 1  ?  (this.subusertypearray = response,this.userFrm.controls['subUserTypeId'].setValue(this.subusertypearray[0].value)): this.subusertypearray.push({ 'value': '', 'text': 'Select SubUser Type' }, ...response);
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

getState(){
  this.stateArray =[];
  this.commonService.getState().subscribe({
    next: (response: any) => {
     this.stateArray.push({ 'value': '', 'text': 'Select State' }, ...response);
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

getdistrict(){
  this.districtArray =[];
  const id =this.userFrm.value.stateId;
  this.commonService.getDistrictByStateId(id).subscribe({
    next: (response: any) => {
     this.districtArray.push({ 'value': '', 'text': 'Select District' }, ...response);
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

}
