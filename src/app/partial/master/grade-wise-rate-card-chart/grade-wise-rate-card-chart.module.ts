import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeWiseRateCardChartRoutingModule } from './grade-wise-rate-card-chart-routing.module';
import { GradeWiseRateCardChartComponent } from './grade-wise-rate-card-chart.component';
import { AngularMaterialModule} from 'src/app/shared/angular-material.module';
import { AddRateCardComponent } from './add-rate-card/add-rate-card.component'

@NgModule({
  declarations: [
    GradeWiseRateCardChartComponent,
    AddRateCardComponent
  ],
  imports: [
    CommonModule,
    GradeWiseRateCardChartRoutingModule,
    AngularMaterialModule
  ]
})
export class GradeWiseRateCardChartModule { }
