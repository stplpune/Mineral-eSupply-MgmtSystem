import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtpReportComponent } from './etp-report.component';

const routes: Routes = [{ path: '', component: EtpReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtpReportRoutingModule { }
