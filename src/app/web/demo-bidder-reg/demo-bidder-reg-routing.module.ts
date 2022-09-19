import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoBidderRegComponent } from './demo-bidder-reg.component';

const routes: Routes = [{ path: '', component: DemoBidderRegComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoBidderRegRoutingModule { }
