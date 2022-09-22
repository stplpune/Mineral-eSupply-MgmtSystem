import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRightsAccessRoutingModule } from './user-rights-access-routing.module';
import { UserRightsAccessComponent } from './user-rights-access.component';


@NgModule({
  declarations: [
    UserRightsAccessComponent
  ],
  imports: [
    CommonModule,
    UserRightsAccessRoutingModule
  ]
})
export class UserRightsAccessModule { }
