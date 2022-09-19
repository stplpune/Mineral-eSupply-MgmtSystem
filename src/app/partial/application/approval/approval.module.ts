import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';


@NgModule({
  declarations: [
    ApprovalComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule
  ]
})
export class ApprovalModule { }
