import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from './../../../configs/config.service';
import { ErrorHandlerService } from './../../../core/services/error-handler.service';
import { FormsValidationService } from './../../../core/services/forms-validation.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-coal-grade-master',
  templateUrl: './coal-grade-master.component.html',
  styleUrls: ['./coal-grade-master.component.scss']
})
export class CoalGradeMasterComponent implements OnInit {displayedColumns: string[] = ['position','sr', 'web',];
dataSource: any;
coalFrm !:FormGroup;
@ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
constructor(private fb: FormBuilder,
  public commonMethod: CommonMethodsService,
  public apiService: CallApiService,
  public validation: FormsValidationService,
  public error: ErrorHandlerService,
  public configService :ConfigService ,
  private spinner: NgxSpinnerService, private router: Router) { }

ngOnInit(): void {
  this.defaultForm();
}
defaultForm() {
  this.coalFrm = this.fb.group({
    coal: ['',[ Validators.required,Validators.pattern('^[^\\s\\[\\[`&._@#%*!+"\'\/\\]\\]{}][0-9a-zA-Z&s\\s]+$')]],
  })
}

getData() {
  this.apiService.setHttp('get', "user-registration/", false, false, false, 'masterUrl');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === "200") {
        this.dataSource = new MatTableDataSource(res.responseData.responseData1);
      } else {
        this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

saveUpdate() {
  this.spinner.show();
  const formValue = this.coalFrm.value;
  if (this.coalFrm.invalid) {
    this.spinner.hide();
    return;
  }

  this.apiService.setHttp('get', "user-registration/" + formValue.userName.trim() + "/" + formValue.passWord.trim(), false, false, false, 'masterUrl');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === "200") {
        this.spinner.hide();
      } else {
        this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
      }
    },
    error: ((error: any) => { this.error.handelError(error.status) })
  })
}

clearAll(){
  this.formGroupDirective.resetForm();
}

}

