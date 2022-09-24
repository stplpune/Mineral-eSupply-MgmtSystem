import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentReceiptRoutingModule } from './payment-receipt-routing.module';
import { PaymentReceiptComponent } from './payment-receipt.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    PaymentReceiptComponent
  ],
  imports: [
    CommonModule,
    PaymentReceiptRoutingModule,
    AngularMaterialModule
  ]
})
export class PaymentReceiptModule { }
