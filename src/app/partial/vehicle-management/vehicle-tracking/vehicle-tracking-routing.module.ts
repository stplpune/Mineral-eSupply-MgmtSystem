import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTrackingComponent } from './vehicle-tracking.component';

const routes: Routes = [{ path: '', component: VehicleTrackingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleTrackingRoutingModule { }
