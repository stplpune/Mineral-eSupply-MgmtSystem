import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmMapComponent } from './components/agm-map/agm-map.component';
import { AgmCoreModule } from '@agm/core';
import { ConfigService } from '../configs/config.service';
import { AgmDrawingModule } from '@agm/drawing';


@NgModule({
  declarations: [AgmMapComponent],
  imports: [
    CommonModule,
    AgmDrawingModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ],
  exports: [AgmMapComponent]
})
export class ShardModule { }
