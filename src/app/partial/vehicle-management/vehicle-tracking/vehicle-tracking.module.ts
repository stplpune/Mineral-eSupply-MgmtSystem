import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTrackingRoutingModule } from './vehicle-tracking-routing.module';
import { VehicleTrackingComponent } from './vehicle-tracking.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ConfigService } from 'src/app/configs/config.service';


@NgModule({
  declarations: [
    VehicleTrackingComponent
  ],
  imports: [
    CommonModule,
    VehicleTrackingRoutingModule,
    AngularMaterialModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ]
})
export class VehicleTrackingModule { }
