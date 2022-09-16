import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebHeaderRoutingModule } from './web-header-routing.module';
import { WebHeaderComponent } from './web-header.component';


@NgModule({
  declarations: [
    WebHeaderComponent
  ],
  imports: [
    CommonModule,
    WebHeaderRoutingModule
  ]
})
export class WebHeaderModule { }
