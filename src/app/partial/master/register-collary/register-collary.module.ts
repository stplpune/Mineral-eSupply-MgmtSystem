import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCollaryRoutingModule } from './register-collary-routing.module';
import { RegisterCollaryComponent } from './register-collary.component';


@NgModule({
  declarations: [
    RegisterCollaryComponent
  ],
  imports: [
    CommonModule,
    RegisterCollaryRoutingModule
  ]
})
export class RegisterCollaryModule { }