import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCollaryRoutingModule } from './register-collary-routing.module';
import { RegisterCollaryComponent } from './register-collary.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ShardModule } from 'src/app/shared/shard.module';

@NgModule({
  declarations: [
    RegisterCollaryComponent
  ],
  imports: [
    CommonModule,
    RegisterCollaryRoutingModule,
    AngularMaterialModule,
    ShardModule
  ]
})
export class RegisterCollaryModule { }
