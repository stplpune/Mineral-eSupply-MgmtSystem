import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPaymentRoutingModule } from './booking-payment-routing.module';
import { BookingPaymentComponent } from './booking-payment.component';


@NgModule({
  declarations: [
    BookingPaymentComponent
  ],
  imports: [
    CommonModule,
    BookingPaymentRoutingModule
  ]
})
export class BookingPaymentModule { }
