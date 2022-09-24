import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmMapComponent } from './components/agm-map/agm-map.component';
import { AgmCoreModule } from '@agm/core';
import { ConfigService } from '../configs/config.service';
import { AgmDrawingModule } from '@agm/drawing';
import { AngularMaterialModule } from './angular-material.module';
import { UpperCaseTextDirective } from './directive/upper-case-text.directive';


@NgModule({
  declarations: [AgmMapComponent,UpperCaseTextDirective],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AgmDrawingModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ],
  exports: [AgmMapComponent,UpperCaseTextDirective],
})
export class ShardModule { }
