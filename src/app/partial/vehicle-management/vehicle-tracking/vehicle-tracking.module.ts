import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTrackingRoutingModule } from './vehicle-tracking-routing.module';
import { VehicleTrackingComponent } from './vehicle-tracking.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    VehicleTrackingComponent
  ],
  imports: [
    CommonModule,
    VehicleTrackingRoutingModule,
    AngularMaterialModule
  ]
})
export class VehicleTrackingModule { }
