import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerRegistrationRoutingModule } from './consumer-registration-routing.module';
import { ConsumerRegistrationComponent } from './consumer-registration.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ShardModule } from 'src/app/shared/shard.module';

@NgModule({
  declarations: [
    ConsumerRegistrationComponent,
    
  ],
  imports: [
    CommonModule,
    ConsumerRegistrationRoutingModule,
    AngularMaterialModule,
    ShardModule
    
  ]
})
export class ConsumerRegistrationModule { }
