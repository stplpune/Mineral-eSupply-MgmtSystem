import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentReceiptComponent } from './payment-receipt.component';

const routes: Routes = [{ path: '', component: PaymentReceiptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentReceiptRoutingModule { }
