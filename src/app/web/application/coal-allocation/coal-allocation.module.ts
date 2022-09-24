import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoalAllocationRoutingModule } from './coal-allocation-routing.module';
import { CoalAllocationComponent } from './coal-allocation.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShardModule } from 'src/app/shared/shard.module';

@NgModule({
  declarations: [
    CoalAllocationComponent,
  ],
  imports: [
    CommonModule,
    CoalAllocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ShardModule
  ]
})

export class CoalAllocationModule { }
