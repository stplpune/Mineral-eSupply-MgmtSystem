import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyAllocationToMsmeComponent } from './monthly-allocation-to-msme.component';

const routes: Routes = [{ path: '', component: MonthlyAllocationToMsmeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyAllocationToMsmeRoutingModule { }
