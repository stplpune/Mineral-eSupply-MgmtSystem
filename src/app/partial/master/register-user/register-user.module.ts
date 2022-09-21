import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    RegisterUserComponent,AddUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    AngularMaterialModule,ReactiveFormsModule
  ]
})
export class RegisterUserModule { }
