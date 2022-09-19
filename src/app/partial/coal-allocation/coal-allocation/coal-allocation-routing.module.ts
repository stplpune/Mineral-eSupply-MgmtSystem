import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoalAllocationComponent } from './coal-allocation.component';

const routes: Routes = [{ path: '', component: CoalAllocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoalAllocationRoutingModule { }
