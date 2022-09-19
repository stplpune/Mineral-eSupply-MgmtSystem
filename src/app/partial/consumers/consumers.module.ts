import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersComponent } from './consumers.component';


@NgModule({
  declarations: [
    ConsumersComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule
  ]
})
export class ConsumersModule { }
