import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPaymentComponent } from './booking-payment.component';

const routes: Routes = [{ path: '', component: BookingPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingPaymentRoutingModule { }
