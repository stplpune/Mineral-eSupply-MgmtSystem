import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
