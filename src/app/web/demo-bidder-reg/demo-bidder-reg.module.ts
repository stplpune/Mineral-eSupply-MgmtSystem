import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoBidderRegRoutingModule } from './demo-bidder-reg-routing.module';
import { DemoBidderRegComponent } from './demo-bidder-reg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DemoBidderRegComponent
  ],
  imports: [
    CommonModule,
    DemoBidderRegRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemoBidderRegModule { }
