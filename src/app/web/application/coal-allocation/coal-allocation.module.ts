import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoalAllocationRoutingModule } from './coal-allocation-routing.module';
import { CoalAllocationComponent } from './coal-allocation.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpperCaseTextDirective } from 'src/app/shared/directive/upper-case-text.directive';

@NgModule({
  declarations: [
    CoalAllocationComponent,
    UpperCaseTextDirective
  ],
  imports: [
    CommonModule,
    CoalAllocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    
  ]
})

export class CoalAllocationModule { }
