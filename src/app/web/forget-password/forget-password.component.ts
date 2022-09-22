import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetFrm !: FormGroup;
  recivedOtp:any;
  otpSendFlag:boolean = true;

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    private commonApiCall:CommonApiCallService,
    public error: ErrorHandlerService,
    private router:Router) { }

  ngOnInit(): void {
    this.forgetFrm = this.fb.group({
      mobileNumber: ['',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
      otpNumber: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
      cpassword: ['',[Validators.required,Validators.pattern(this.validation.valMobileNo)]],
    })
  }

  sendOtp(){
    if(this.forgetFrm.controls['mobileNumber'].status != 'VALID'){
      return
    }
   this.commonApiCall.generateOtp(this.forgetFrm.value.mobileNumber).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ?  this.otpSendFlag = true :'';
        this.otpSendFlag
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }
    

  onSubmit(){
    if (this.forgetFrm.invalid) {
      return;
    }
    this.apiService.setHttp('get', "user-registration/", false, false, false, 'masterUrl');
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
  }
}
