import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerDashboardRoutingModule } from './consumer-dashboard-routing.module';
import { ConsumerDashboardComponent } from './consumer-dashboard.component';


@NgModule({
  declarations: [
    ConsumerDashboardComponent
  ],
  imports: [
    CommonModule,
    ConsumerDashboardRoutingModule
  ]
})
export class ConsumerDashboardModule { }
