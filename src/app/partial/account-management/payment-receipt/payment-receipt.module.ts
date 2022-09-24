import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentReceiptRoutingModule } from './payment-receipt-routing.module';
import { PaymentReceiptComponent } from './payment-receipt.component';


@NgModule({
  declarations: [
    PaymentReceiptComponent
  ],
  imports: [
    CommonModule,
    PaymentReceiptRoutingModule
  ]
})
export class PaymentReceiptModule { }
