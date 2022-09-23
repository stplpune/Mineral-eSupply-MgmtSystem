import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;
  changePasswordFrm !: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;


  localstorageData = this.webstorageService.getLoggedInLocalstorageData();
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    private router: Router,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private spinner: NgxSpinnerService,
    private webstorageService:WebStorageService) { }


  ngOnInit(): void {
    this.changePasswordFrm = this.fb.group({
      oldPassword: ['',[Validators.required,Validators.pattern(this.validation.valPassword)]],
      newPassword: ['',[Validators.required,Validators.pattern(this.validation.valPassword)]],
      confirmPassword: ['',[Validators.required,Validators.pattern(this.validation.valPassword)]]
    });
  }

  onSubmit() {
    const formData = this.changePasswordFrm.value;
    if (this.changePasswordFrm.invalid) {
      return;
    } else if (formData.newPassword != formData.confirmPassword) {
      this.changePasswordFrm.controls['confirmPassword'].setErrors({ 'notMatched': true });
      return;
    } else if (formData.oldPassword == formData.newPassword && (this.commonMethod.checkDataType(formData.oldPassword) == true && this.commonMethod.checkDataType(formData.newPassword) == true)) {
      this.changePasswordFrm.controls['confirmPassword'].setErrors({ 'Matched': true });
      return;
    }

    let obj = {
      "oldPassword":formData.oldPassword,
      "userId": this.localstorageData.responseData.userId ,
      "userName": this.localstorageData.responseData.userName,
      "password": formData.newPassword,
      "otpNumber": 0
    }

    this.apiService.setHttp('put', "Login/ChangePassword", false, obj, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          this.commonMethod.matSnackBar(res.statusMessage,0);
          localStorage.removeItem('loggedInData');
          sessionStorage.removeItem('loggedIn');
          this.router.navigate(['/login']);
          this.ClearAll();
        } else {
          this.spinner.hide();
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }


  closeDialog() {
    this.dialogRef.close('Yes');
  }

  ClearAll() {
    this.formGroupDirective.resetForm();
    this.dialogRef.close('No');
  }

}
