import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsmeApplicationListRoutingModule } from './msme-application-list-routing.module';
import { MsmeApplicationListComponent } from './msme-application-list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    MsmeApplicationListComponent
  ],
  imports: [
    CommonModule,
    MsmeApplicationListRoutingModule,
    AngularMaterialModule
  ]
})
export class MsmeApplicationListModule { }
