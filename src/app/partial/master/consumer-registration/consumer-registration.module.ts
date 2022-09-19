import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerRegistrationRoutingModule } from './consumer-registration-routing.module';
import { ConsumerRegistrationComponent } from './consumer-registration.component';


@NgModule({
  declarations: [
    ConsumerRegistrationComponent
  ],
  imports: [
    CommonModule,
    ConsumerRegistrationRoutingModule
  ]
})
export class ConsumerRegistrationModule { }
