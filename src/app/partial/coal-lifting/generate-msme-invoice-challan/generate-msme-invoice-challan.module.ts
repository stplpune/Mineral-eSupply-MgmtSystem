import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateMsmeInvoiceChallanRoutingModule } from './generate-msme-invoice-challan-routing.module';
import { GenerateMsmeInvoiceChallanComponent } from './generate-msme-invoice-challan.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    GenerateMsmeInvoiceChallanComponent
  ],
  imports: [
    CommonModule,
    GenerateMsmeInvoiceChallanRoutingModule,
    AngularMaterialModule
  ]
})
export class GenerateMsmeInvoiceChallanModule { }
