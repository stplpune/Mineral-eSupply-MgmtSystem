import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingSlipComponent } from './loading-slip.component';

const routes: Routes = [{ path: '', component: LoadingSlipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingSlipRoutingModule { }
