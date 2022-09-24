import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForfeitRoutingModule } from './forfeit-routing.module';
import { ForfeitComponent } from './forfeit.component';


@NgModule({
  declarations: [
    ForfeitComponent
  ],
  imports: [
    CommonModule,
    ForfeitRoutingModule
  ]
})
export class ForfeitModule { }
