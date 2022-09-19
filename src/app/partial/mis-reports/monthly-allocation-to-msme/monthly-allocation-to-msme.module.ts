import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyAllocationToMsmeRoutingModule } from './monthly-allocation-to-msme-routing.module';
import { MonthlyAllocationToMsmeComponent } from './monthly-allocation-to-msme.component';


@NgModule({
  declarations: [
    MonthlyAllocationToMsmeComponent
  ],
  imports: [
    CommonModule,
    MonthlyAllocationToMsmeRoutingModule
  ]
})
export class MonthlyAllocationToMsmeModule { }
