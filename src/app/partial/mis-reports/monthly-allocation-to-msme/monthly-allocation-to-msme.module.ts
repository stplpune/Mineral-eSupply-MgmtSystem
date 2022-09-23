import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyAllocationToMsmeRoutingModule } from './monthly-allocation-to-msme-routing.module';
import { MonthlyAllocationToMsmeComponent } from './monthly-allocation-to-msme.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    MonthlyAllocationToMsmeComponent
  ],
  imports: [
    CommonModule,
    MonthlyAllocationToMsmeRoutingModule,
    AngularMaterialModule
  ]
})
export class MonthlyAllocationToMsmeModule { }
