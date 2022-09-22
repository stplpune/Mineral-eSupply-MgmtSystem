import { ErrorHandlerService } from './../../core/services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private router: Router) { }
  loginFrm !: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.commonMethod.createCaptchaCarrerPage();
    this.defaultForm();
  }

  defaultForm() {
    this.loginFrm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(this.validation.valMobileNo)],],
      passWord: ['', [Validators.required, Validators.pattern(this.validation.valPassword)]],
      captcha: ['', Validators.required]
    });
  }


  get loginFormControls(): any { return this.loginFrm.controls }

  onSubmit() {
    const formValue = this.loginFrm.value;
    formValue.otp = 0;

    if (this.loginFrm.invalid) {
      return;
    } else if (formValue.captcha.trim() != this.commonMethod.checkvalidateCaptcha()) {
      this.commonMethod.matSnackBar("Please enter valid captcha ", 1);
      this.commonMethod.createCaptchaCarrerPage();
      return;
    }
    this.apiService.setHttp('post', "Login/CheckLogin", false, formValue, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        localStorage.setItem('loggedInData', JSON.stringify(res));
        sessionStorage.setItem('loggedIn', 'true');
        if (res.statusCode == "200") {
        this.router.navigate(['../dashboard']);
        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  clearAll() {
    this.loginFrm.reset();
  }
}
