import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetFrm !: FormGroup;
  recivedOtp:any;
  otpSendFlag:boolean = true;
  localstorageData:any;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    private commonApiCall:CommonApiCallService,
    private snackbar:MatSnackBar,
    public error: ErrorHandlerService,
    private router:Router,
    private webstorageService:WebStorageService,
    ) { 
      // this.localstorageData = this.webstorageService.getLoggedInLocalstorageData();
    }

  ngOnInit(): void {
    this.forgetFrm = this.fb.group({
      // mobileNumber: ['',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
      mobileNumber: ['9172516012',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
      otpNumber: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
      cpassword: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
    })
  }


  sendOtp(){
    if(this.forgetFrm.controls['mobileNumber'].status != 'VALID'){
      return
    }
   this.commonApiCall.generateOtp(this.forgetFrm.value.mobileNumber).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ?  this.otpSendFlag = true :'';
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }
    
  // verifyOtp(mobileNo:any,otp:any)

  onSubmit(){
    let formData = this.forgetFrm.value;
    if (this.forgetFrm.invalid) {
      return;
    }else if (formData.password != formData.cpassword) {
      this.snackbar.open('New password and confirm password does not match');
      return
    }
    debugger;
    this.commonApiCall.verifyOtp(formData.mobileNumber, formData.otpNumber).subscribe({
      next: (res: any) => {
        if(res.statusCode == "200"){
          let obj = {
            "userId": this.localstorageData.responseData.userId,
            "userName": this.localstorageData.responseData.userName,
            "password": formData.password,
            "otpNumber":  formData.otpNumber
          }
          this.apiService.setHttp('PUT', "Login/UpdatePassword", false, obj, false, 'WBMiningService');
          this.apiService.getHttp().subscribe({
            next: (res: any) => {
              if (res.statusCode == "200") {
              this.forgetFrm.controls['mobileNumber'].setValue('');
                this.router.navigate(['/login']);
              } else {
                this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
              }
            },
            error: ((error: any) => { this.error.handelError(error.status) })
          })
        }else{
          this.snackbar.open('Otp is incorrect');
        }
      },
      error: ((error: any) => { 
        this.error.handelError(error.status); return })
    })
    // check otp validation

   
  }
}
