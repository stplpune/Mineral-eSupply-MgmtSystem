import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    AngularMaterialModule
  ]
})
export class ForgetPasswordModule { }
