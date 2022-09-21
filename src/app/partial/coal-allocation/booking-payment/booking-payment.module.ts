import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPaymentRoutingModule } from './booking-payment-routing.module';
import { BookingPaymentComponent } from './booking-payment.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    BookingPaymentComponent
  ],
  imports: [
    CommonModule,
    BookingPaymentRoutingModule,
    AngularMaterialModule
  ]
})
export class BookingPaymentModule { }
