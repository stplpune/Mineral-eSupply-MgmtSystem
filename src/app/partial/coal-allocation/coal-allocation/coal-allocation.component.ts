import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
type NewType = FormControl;

@Component({
  selector: 'app-coal-allocation',
  templateUrl: './coal-allocation.component.html',
  styleUrls: ['./coal-allocation.component.scss']
})
export class CoalAllocationComponent implements OnInit {
  //------------------ ECL Monthly Allocation variable ---------------//
  monthlyFrm!: FormGroup;
  monthlySearch = new FormControl('');
  pageNumber =1

  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    private spinner: NgxSpinnerService, private router: Router) { }
    yearArray: any[]=['Oct-22','Nov-22','Dec-22','Jan-23','Feb-23','Mar-23']

  ngOnInit(): void {
    this.monthlyDefaultForm();
  }

  //------------------ ECL Monthly Allocation start here ---------------//
  monthlyDefaultForm(){

    this.monthlyFrm = this.fb.group({
      "id": 0,
      "collieryId": [''],
      "monthYear": [''],
      "allocationDate": [''],
      "allocationQty": [''],
      "createdBy":['']
    })
  }
  bindECLMonthlyTable(){
    this.spinner.show();
    this.apiService.setHttp('get', "ECLMonthlyAllocation/GetAll?MonthYear=jan-22&nopage=1", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.spinner.hide();

        } else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

    //------------------ ECL Monthly Allocation start here ---------------//
}
