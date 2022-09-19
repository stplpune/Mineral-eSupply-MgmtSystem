import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterVehicleRoutingModule } from './register-vehicle-routing.module';
import { RegisterVehicleComponent } from './register-vehicle.component';


@NgModule({
  declarations: [
    RegisterVehicleComponent
  ],
  imports: [
    CommonModule,
    RegisterVehicleRoutingModule
  ]
})
export class RegisterVehicleModule { }
