import { CommonMethodsService } from './../../../core/services/common-methods.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  dialogData:any;
  remark = new FormControl('');

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    public CommonMethod:CommonMethodsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.dialogData = this.data
  }

  onNoClick(flag: any ): void {
    if(this.data.inputType && flag == 'Yes' ){
      if(this.CommonMethod.checkDataType(this.remark.value)== false ){
        this.CommonMethod.matSnackBar('Please Enter Remark',1);
        return;
      }
      let obj={  remark:this.remark.value, flag:'Yes' }
      this.dialogRef.close(obj);
    }else{
      this.dialogRef.close(flag);
    }

  }

}
