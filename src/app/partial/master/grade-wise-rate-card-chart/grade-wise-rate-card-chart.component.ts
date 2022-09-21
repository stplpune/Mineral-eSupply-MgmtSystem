import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/configs/config.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-grade-wise-rate-card-chart',
  templateUrl: './grade-wise-rate-card-chart.component.html',
  styleUrls: ['./grade-wise-rate-card-chart.component.scss']
})
export class GradeWiseRateCardChartComponent implements OnInit {
    
  form!: FormGroup;
  isSubmitted: boolean = false;
  minearlNameArr: any [] = ['Sand', 'Stone'];

  constructor(public dialog: MatDialog, public configService:ConfigService, private fb: FormBuilder, private fv: FormsValidationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      mineral: this.fb.array([])
    });

    const formArray = this.minearlNameArr.map((m) => {
        return this.fb.group({
          mineralName: [m],
          mineralCharge: ['', [Validators.pattern(this.fv.numbersWithDot)]]
        })
      }
    );

    this.form.setControl('mineral', this.fb.array(formArray));
  }

  get minerals() {
    return this.form.get("mineral") as FormArray;
  }

  onSubmitMain(){
    this.isSubmitted = true;
    if(this.form.valid){
      this.isSubmitted = false;
      console.log(this.form.value);
    }
  }


  deleteRecord() {
    let obj:any = ConfigService.dialogObj;
    
    obj['p1'] = 'Are you sure you want to delete this record?';
    obj['cardTitle'] = 'Delete';
    obj['successBtnText'] = 'Delete';
    obj['cancelBtnText'] =  'Cancel';

    const dialog = this.dialog.open(ConfirmationComponent, {
      width:this.configService.dialogBoxWidth[0],
      data: obj,
      disableClose: this.configService.disableCloseBtnFlag,
    })
    dialog.afterClosed().subscribe(res => {
      
    })
  }
}
