import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryOrderRoutingModule } from './delivery-order-routing.module';
import { DeliveryOrderComponent } from './delivery-order.component';


@NgModule({
  declarations: [
    DeliveryOrderComponent
  ],
  imports: [
    CommonModule,
    DeliveryOrderRoutingModule
  ]
})
export class DeliveryOrderModule { }
