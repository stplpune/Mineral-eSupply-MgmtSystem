import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoalGradeMasterRoutingModule } from './coal-grade-master-routing.module';
import { CoalGradeMasterComponent } from './coal-grade-master.component';


@NgModule({
  declarations: [
    CoalGradeMasterComponent
  ],
  imports: [
    CommonModule,
    CoalGradeMasterRoutingModule
  ]
})
export class CoalGradeMasterModule { }
