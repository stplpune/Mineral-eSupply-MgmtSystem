import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsmeApplicationListRoutingModule } from './msme-application-list-routing.module';
import { MsmeApplicationListComponent } from './msme-application-list.component';


@NgModule({
  declarations: [
    MsmeApplicationListComponent
  ],
  imports: [
    CommonModule,
    MsmeApplicationListRoutingModule
  ]
})
export class MsmeApplicationListModule { }
