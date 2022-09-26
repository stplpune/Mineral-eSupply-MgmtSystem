import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerDashboardRoutingModule } from './consumer-dashboard-routing.module';
import { ConsumerDashboardComponent } from './consumer-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    ConsumerDashboardComponent
  ],
  imports: [
    CommonModule,
    ConsumerDashboardRoutingModule,
    NgApexchartsModule
  ]
})
export class ConsumerDashboardModule { }
