import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForfeitRoutingModule } from './forfeit-routing.module';
import { ForfeitComponent } from './forfeit.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    ForfeitComponent
  ],
  imports: [
    CommonModule,
    ForfeitRoutingModule,
    AngularMaterialModule
  ]
})
export class ForfeitModule { }
