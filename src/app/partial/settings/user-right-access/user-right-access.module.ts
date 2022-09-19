import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRightAccessRoutingModule } from './user-right-access-routing.module';
import { UserRightAccessComponent } from './user-right-access.component';


@NgModule({
  declarations: [
    UserRightAccessComponent
  ],
  imports: [
    CommonModule,
    UserRightAccessRoutingModule
  ]
})
export class UserRightAccessModule { }
