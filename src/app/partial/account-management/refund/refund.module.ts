import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { RefundComponent } from './refund.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    RefundComponent
  ],
  imports: [
    CommonModule,
    RefundRoutingModule,
    AngularMaterialModule
  ]
})
export class RefundModule { }
