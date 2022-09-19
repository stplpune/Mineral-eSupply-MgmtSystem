import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenReaderAccessRoutingModule } from './screen-reader-access-routing.module';
import { ScreenReaderAccessComponent } from './screen-reader-access.component';


@NgModule({
  declarations: [
    ScreenReaderAccessComponent
  ],
  imports: [
    CommonModule,
    ScreenReaderAccessRoutingModule
  ]
})
export class ScreenReaderAccessModule { }
