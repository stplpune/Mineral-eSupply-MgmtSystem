import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    AngularMaterialModule
  ]
})
export class RegisterUserModule { }
