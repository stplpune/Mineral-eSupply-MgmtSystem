import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateMsmeInvoiceChallanRoutingModule } from './generate-msme-invoice-challan-routing.module';
import { GenerateMsmeInvoiceChallanComponent } from './generate-msme-invoice-challan.component';


@NgModule({
  declarations: [
    GenerateMsmeInvoiceChallanComponent
  ],
  imports: [
    CommonModule,
    GenerateMsmeInvoiceChallanRoutingModule
  ]
})
export class GenerateMsmeInvoiceChallanModule { }
