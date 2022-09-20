import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoalAllocationRoutingModule } from './coal-allocation-routing.module';
import { CoalAllocationComponent } from './coal-allocation.component';


@NgModule({
  declarations: [
    CoalAllocationComponent
  ],
  imports: [
    CommonModule,
    CoalAllocationRoutingModule,
  ]
})
export class CoalAllocationModule { }
