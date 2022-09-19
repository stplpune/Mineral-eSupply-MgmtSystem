import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenReaderAccessRoutingModule } from './screen-reader-access-routing.module';
import { ScreenReaderAccessComponent } from './screen-reader-access.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    ScreenReaderAccessComponent
  ],
  imports: [
    CommonModule,
    ScreenReaderAccessRoutingModule,
    AngularMaterialModule
  ]
})
export class ScreenReaderAccessModule { }
