import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoalGradeMasterComponent } from './coal-grade-master.component';

const routes: Routes = [{ path: '', component: CoalGradeMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoalGradeMasterRoutingModule { }
