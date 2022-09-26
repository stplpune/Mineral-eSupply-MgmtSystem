import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerDetailsRoutingModule } from './consumer-details-routing.module';
import { ConsumerDetailsComponent } from './consumer-details.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ConsumerDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsumerDetailsRoutingModule,
    AngularMaterialModule,
    NgApexchartsModule
  ]
})
export class ConsumerDetailsModule { }
