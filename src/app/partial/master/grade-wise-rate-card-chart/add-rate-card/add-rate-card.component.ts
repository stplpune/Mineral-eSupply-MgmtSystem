import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-add-rate-card',
  templateUrl: './add-rate-card.component.html',
  styleUrls: ['./add-rate-card.component.scss']
})
export class AddRateCardComponent implements OnInit {

  addRateCardForm:FormGroup | any;
  selected = 'Ton';

  constructor(
    private fb: FormBuilder,
    public commonMethod: CommonMethodsService,
    public callApiService: CallApiService,
    public validationService: FormsValidationService,
    public error: ErrorHandlerService,
    public configService: ConfigService,
    public commonService: CommonApiCallService,
    private webStorageService: WebStorageService,
    public dialogRef: MatDialogRef<AddRateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.defaultForm();
    this.patchData();
  }

  defaultForm() {
    this.addRateCardForm = this.fb.group({
      id: [''],
      coalGradeName: [''],
      unit: [''],
      baseRate: [''],
      royalty: [''],
      cgst: [''],
      sgst: [''],
      igst: [''],
      cess: [''],
    });
  }

  patchData(){
    this.addRateCardForm.patchValue({
      id: this.data.id,
      coalGradeName: this.data.coalGradeName,
      unit: this.data.unit,
      baseRate: this.data.baseRate,
      royalty: this.data.royalty,
      cgst: this.data.cgst,
      sgst: this.data.sgst,
      igst: this.data.igst,
      cess: this.data.cess,
    })
  }

  onSubmit() {
    let formData = this.addRateCardForm.value;
    let obj = {
     "createdBy": this.webStorageService.getUserId(),
     "modifiedBy": this.webStorageService.getUserId(),
     "createdDate": new Date(),
     "modifiedDate": new Date(),
     "isDeleted": false,
     "id": 0,
     "coalGradeId": parseInt(this.data.coalGradeId),
     "unit": 'Ton',
     "baseRate": parseInt(formData.baseRate),
     "royalty": parseInt(formData.royalty),
     "cgst": parseInt(formData.cgst),
     "sgst": parseInt(formData.sgst),
     "igst": parseInt(formData.igst),
     "cess": parseInt(formData.cess),
     "total": 0,
     "flag": "u"
   }

     this.callApiService.setHttp('POST', 'CoalGradewiseRateMaster/SaveUpdateCoalGradeRateMaster', false, obj, false, 'WBMiningService');
     this.callApiService.getHttp().subscribe((res: any) => {
       if (res.statusCode == "200") {
         this.commonMethod.matSnackBar(res.statusMessage, 0);
         this.closeModal();
       } else {
         this.commonMethod.matSnackBar(res.statusMessage, 1);
       }
     }, (error: any) => {
       this.error.handelError(error.status);
     });
   }

  closeModal() {
    this.dialogRef.close();
  }

}
