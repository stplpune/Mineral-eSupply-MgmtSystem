import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';
import { AngularMaterialModule} from 'src/app/shared/angular-material.module'

@NgModule({
  declarations: [
    ApprovalComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    AngularMaterialModule
  ]
})
export class ApprovalModule { }
