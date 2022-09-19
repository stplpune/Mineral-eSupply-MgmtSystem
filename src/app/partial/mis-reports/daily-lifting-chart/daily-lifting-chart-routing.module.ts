import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyLiftingChartComponent } from './daily-lifting-chart.component';

const routes: Routes = [{ path: '', component: DailyLiftingChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyLiftingChartRoutingModule { }
