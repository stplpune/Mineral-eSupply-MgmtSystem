import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoalAllocationRoutingModule } from './coal-allocation-routing.module';
import { CoalAllocationComponent } from './coal-allocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    CoalAllocationComponent
  ],
  imports: [
    CommonModule,
    CoalAllocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class CoalAllocationModule { }
