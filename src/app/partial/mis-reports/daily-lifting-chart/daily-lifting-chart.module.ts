import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyLiftingChartRoutingModule } from './daily-lifting-chart-routing.module';
import { DailyLiftingChartComponent } from './daily-lifting-chart.component';


@NgModule({
  declarations: [
    DailyLiftingChartComponent
  ],
  imports: [
    CommonModule,
    DailyLiftingChartRoutingModule
  ]
})
export class DailyLiftingChartModule { }
