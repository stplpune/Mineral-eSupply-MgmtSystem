import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallanNnvoiceRequestComponent } from './challan-nnvoice-request.component';

const routes: Routes = [{ path: '', component: ChallanNnvoiceRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanNnvoiceRequestRoutingModule { }
