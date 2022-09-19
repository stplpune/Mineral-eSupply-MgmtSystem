import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeWiseRateCardChartComponent } from './grade-wise-rate-card-chart.component';

const routes: Routes = [{ path: '', component: GradeWiseRateCardChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeWiseRateCardChartRoutingModule { }
