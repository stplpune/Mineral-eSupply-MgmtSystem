import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersComponent } from './consumers.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    ConsumersComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    AngularMaterialModule
  ]
})
export class ConsumersModule { }
