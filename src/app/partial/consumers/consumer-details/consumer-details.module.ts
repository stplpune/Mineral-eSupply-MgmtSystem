import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerDetailsRoutingModule } from './consumer-details-routing.module';
import { ConsumerDetailsComponent } from './consumer-details.component';


@NgModule({
  declarations: [
    ConsumerDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsumerDetailsRoutingModule
  ]
})
export class ConsumerDetailsModule { }
