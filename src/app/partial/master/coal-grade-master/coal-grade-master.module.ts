import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoalGradeMasterRoutingModule } from './coal-grade-master-routing.module';
import { CoalGradeMasterComponent } from './coal-grade-master.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    CoalGradeMasterComponent
  ],
  imports: [
    CommonModule,
    CoalGradeMasterRoutingModule,
    AngularMaterialModule
  ]
})
export class CoalGradeMasterModule { }
