import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyLiftingChartRoutingModule } from './daily-lifting-chart-routing.module';
import { DailyLiftingChartComponent } from './daily-lifting-chart.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    DailyLiftingChartComponent
  ],
  imports: [
    CommonModule,
    DailyLiftingChartRoutingModule,
    AngularMaterialModule,
  ]
})
export class DailyLiftingChartModule { }
