import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerDashboardComponent } from './consumer-dashboard.component';

const routes: Routes = [{ path: '', component: ConsumerDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerDashboardRoutingModule { }
