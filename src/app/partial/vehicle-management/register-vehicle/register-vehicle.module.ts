import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterVehicleRoutingModule } from './register-vehicle-routing.module';
import { RegisterVehicleComponent } from './register-vehicle.component';
import { AngularMaterialModule} from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    RegisterVehicleComponent
  ],
  imports: [
    CommonModule,
    RegisterVehicleRoutingModule,
    AngularMaterialModule
  ]
})
export class RegisterVehicleModule { }
