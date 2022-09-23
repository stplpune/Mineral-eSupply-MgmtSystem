import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerDetailsRoutingModule } from './consumer-details-routing.module';
import { ConsumerDetailsComponent } from './consumer-details.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    ConsumerDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsumerDetailsRoutingModule,
    AngularMaterialModule
  ]
})
export class ConsumerDetailsModule { }
