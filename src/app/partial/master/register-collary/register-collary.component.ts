import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-register-collary',
  templateUrl: './register-collary.component.html',
  styleUrls: ['./register-collary.component.scss']
})
export class RegisterCollaryComponent implements OnInit {displayedColumns: string[] = ['position','sr','dist', 'add','action',];
  dataSource = ELEMENT_DATA;
  frm!: FormGroup;
  isfilterSubmit: boolean = false;
  get f() { return this.frm.controls };

  constructor(public configService:ConfigService,
    private fb: FormBuilder,
    public apiService: CallApiService,
    public commonMethod: CommonMethodsService,
    public error: ErrorHandlerService) { }

  ngOnInit(): void {
    this.createFilterForm();

    this.getCollaryList();
  }

  createFilterForm(){
    this.frm = this.fb.group({
      districtId: [''],
      collaryName: ['']
    })
  }

  getCollaryList(){
    this.apiService.setHttp('get', "CollieryMaster", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
        } else {
          // this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  onSearch(){
    this.isfilterSubmit = true;
    if(this.frm.valid){
      this.isfilterSubmit = false;
    }
  }


}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, sr: '', dist:'', add:'', action: '', },
 
];
export interface PeriodicElement {
position:number;
sr: string;
dist: string;
add: string;
action: string;

}