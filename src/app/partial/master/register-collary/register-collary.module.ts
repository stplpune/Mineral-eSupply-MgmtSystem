import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCollaryRoutingModule } from './register-collary-routing.module';
import { RegisterCollaryComponent } from './register-collary.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import { ConfigService } from 'src/app/configs/config.service';

@NgModule({
  declarations: [
    RegisterCollaryComponent
  ],
  imports: [
    CommonModule,
    RegisterCollaryRoutingModule,
    AngularMaterialModule,
    AgmDrawingModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ],
  
})
export class RegisterCollaryModule { }
