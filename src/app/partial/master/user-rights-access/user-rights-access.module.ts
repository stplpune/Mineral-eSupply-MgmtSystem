import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRightsAccessRoutingModule } from './user-rights-access-routing.module';
import { UserRightsAccessComponent } from './user-rights-access.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    UserRightsAccessComponent
  ],
  imports: [
    CommonModule,
    UserRightsAccessRoutingModule,
    AngularMaterialModule
  ]
})
export class UserRightsAccessModule { }
