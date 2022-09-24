import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { RefundComponent } from './refund.component';


@NgModule({
  declarations: [
    RefundComponent
  ],
  imports: [
    CommonModule,
    RefundRoutingModule
  ]
})
export class RefundModule { }
