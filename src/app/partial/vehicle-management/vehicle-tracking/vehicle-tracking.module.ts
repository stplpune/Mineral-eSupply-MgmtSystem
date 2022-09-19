import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTrackingRoutingModule } from './vehicle-tracking-routing.module';
import { VehicleTrackingComponent } from './vehicle-tracking.component';


@NgModule({
  declarations: [
    VehicleTrackingComponent
  ],
  imports: [
    CommonModule,
    VehicleTrackingRoutingModule
  ]
})
export class VehicleTrackingModule { }
