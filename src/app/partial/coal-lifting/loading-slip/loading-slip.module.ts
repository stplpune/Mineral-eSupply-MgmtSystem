import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSlipRoutingModule } from './loading-slip-routing.module';
import { LoadingSlipComponent } from './loading-slip.component';


@NgModule({
  declarations: [
    LoadingSlipComponent
  ],
  imports: [
    CommonModule,
    LoadingSlipRoutingModule
  ]
})
export class LoadingSlipModule { }
