import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRightAccessRoutingModule } from './user-right-access-routing.module';
import { UserRightAccessComponent } from './user-right-access.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    UserRightAccessComponent
  ],
  imports: [
    CommonModule,
    UserRightAccessRoutingModule,
    AngularMaterialModule
  ]
})
export class UserRightAccessModule { }
