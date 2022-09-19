import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryOrderComponent } from './delivery-order.component';

const routes: Routes = [{ path: '', component: DeliveryOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryOrderRoutingModule { }
