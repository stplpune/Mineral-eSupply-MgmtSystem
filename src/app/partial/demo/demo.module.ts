import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { ConfigService } from 'src/app/configs/config.service';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ]
})
export class DemoModule { }
