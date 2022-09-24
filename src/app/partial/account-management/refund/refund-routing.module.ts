import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundComponent } from './refund.component';

const routes: Routes = [{ path: '', component: RefundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundRoutingModule { }
