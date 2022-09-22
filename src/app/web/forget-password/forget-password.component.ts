import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  forgetFrm !: FormGroup;
  recivedOtp: any;
  otpSendFlag: boolean = false;
  localstorageData: any;
  mobileNo!: string;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    private commonApiCall: CommonApiCallService,
    public error: ErrorHandlerService,
    private router: Router,
    private webstorageService: WebStorageService,
  ) {
    this.localstorageData = this.webstorageService.getLoggedInLocalstorageData();
  }

  ngOnInit(): void {
    this.forgetFrm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(this.validation.valMobileNo)]],
      // mobileNumber: ['9172516012',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
      otpNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
      cpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
    })
  }


  sendOtp() {
    if (this.forgetFrm.controls['mobileNumber'].status != 'VALID') {
      return
    }
    this.commonApiCall.generateOtp(this.forgetFrm.value.mobileNumber).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.otpSendFlag = true : '';
        this.mobileNo = this.forgetFrm.value.mobileNumber;
        this.formGroupDirective.resetForm();
        this.forgetFrm.get('mobileNumber')?.setValidators([]);
        this.forgetFrm.controls["mobileNumber"].updateValueAndValidity();
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  // verifyOtp(mobileNo:any,otp:any)

  onSubmit() {
    let formData = this.forgetFrm.value;
    if (this.forgetFrm.invalid) {
      return;
    } else if (formData.password != formData.cpassword) {
      this.commonMethod.matSnackBar('New password and confirm password does not match', 1);
      return
    }

    let obj = {
      "userId": 0,
      "userName": this.mobileNo,
      "password": formData.password,
      "otpNumber": +formData.otpNumber
    }

    this.apiService.setHttp('PUT', "Login/UpdatePassword", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.forgetFrm.controls['mobileNumber'].setValue('');
          this.router.navigate(['/login']);
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })

    // this.commonApiCall.verifyOtp(this.mobileNo, formData.otpNumber).subscribe({
    //   next: (res: any) => {
    //     if(res.statusCode == "200"){
    //       let obj = {
    //         "userId": '',
    //         "userName": this.mobileNo,
    //         "password": formData.password,
    //         "otpNumber":  +formData.otpNumber
    //       }

    //     }
    //   },
    //   error: ((error: any) => { 
    //     error.statusMessage ?   this.commonMethod.matSnackBar(error?.statusMessage, 1) : this.error.handelError(error.status)})
    // })

  }
}
