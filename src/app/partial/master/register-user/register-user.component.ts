import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { AddUserComponent } from './add-user/add-user.component';

interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  srno: number;
  name: string;
  mobileno: number;
  usertype: string;
  subusertype: string;
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, name: 'Hydrogen', mobileno: 1.0079, usertype: 'H', subusertype: 'H', actions: '' },
  { srno: 2, name: 'Helium', mobileno: 4.0026, usertype: 'He', subusertype: 'H', actions: '' },
  { srno: 3, name: 'Lithium', mobileno: 6.941, usertype: 'Li', subusertype: 'H', actions: '' },
  { srno: 4, name: 'Beryllium', mobileno: 9.0122, usertype: 'Be', subusertype: 'H', actions: '' },
  { srno: 5, name: 'Boron', mobileno: 10.811, usertype: 'B', subusertype: 'H', actions: '' },
  { srno: 6, name: 'Carbon', mobileno: 12.0107, usertype: 'C', subusertype: 'H', actions: '' },
  { srno: 7, name: 'Nitrogen', mobileno: 14.0067, usertype: 'N', subusertype: 'H', actions: '' },
  { srno: 8, name: 'Oxygen', mobileno: 15.9994, usertype: 'O', subusertype: 'H', actions: '' },
  { srno: 9, name: 'Fluorine', mobileno: 18.9984, usertype: 'F', subusertype: 'H', actions: '' },
  { srno: 10, name: 'Neon', mobileno: 20.1797, usertype: 'Ne', subusertype: 'H', actions: '' },
];
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'name', 'mobileno', 'usertype', 'subusertype', 'actions'];
  dataSource = ELEMENT_DATA;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public apiService: CallApiService,
    public validation: FormsValidationService,
    public error: ErrorHandlerService,
    public dialog:MatDialog,
    public commonService:CommonApiCallService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.openUserModal();

  }

  openUserModal(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      height: 'auto',
      disableClose: true ,
      data:'',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 'post'){


      }
    });
  }

}
