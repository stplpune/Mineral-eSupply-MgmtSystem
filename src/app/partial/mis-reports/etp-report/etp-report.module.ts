import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtpReportRoutingModule } from './etp-report-routing.module';
import { EtpReportComponent } from './etp-report.component';
import { AngularMaterialModule} from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    EtpReportComponent
  ],
  imports: [
    CommonModule,
    EtpReportRoutingModule,
    AngularMaterialModule    
  ]
})
export class EtpReportModule { }
