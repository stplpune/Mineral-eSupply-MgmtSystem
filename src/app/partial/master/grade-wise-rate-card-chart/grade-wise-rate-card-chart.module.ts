import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeWiseRateCardChartRoutingModule } from './grade-wise-rate-card-chart-routing.module';
import { GradeWiseRateCardChartComponent } from './grade-wise-rate-card-chart.component';


@NgModule({
  declarations: [
    GradeWiseRateCardChartComponent
  ],
  imports: [
    CommonModule,
    GradeWiseRateCardChartRoutingModule
  ]
})
export class GradeWiseRateCardChartModule { }
