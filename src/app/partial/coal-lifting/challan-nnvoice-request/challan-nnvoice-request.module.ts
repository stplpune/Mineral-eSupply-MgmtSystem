import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanNnvoiceRequestRoutingModule } from './challan-nnvoice-request-routing.module';
import { ChallanNnvoiceRequestComponent } from './challan-nnvoice-request.component';


@NgModule({
  declarations: [
    ChallanNnvoiceRequestComponent
  ],
  imports: [
    CommonModule,
    ChallanNnvoiceRequestRoutingModule
  ]
})
export class ChallanNnvoiceRequestModule { }
