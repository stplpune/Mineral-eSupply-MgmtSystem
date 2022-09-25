import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    LedgerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule,
    AngularMaterialModule
  ]
})
export class LedgerModule { }
