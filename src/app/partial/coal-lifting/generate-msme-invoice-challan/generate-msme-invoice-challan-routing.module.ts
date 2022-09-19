import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateMsmeInvoiceChallanComponent } from './generate-msme-invoice-challan.component';

const routes: Routes = [{ path: '', component: GenerateMsmeInvoiceChallanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateMsmeInvoiceChallanRoutingModule { }
