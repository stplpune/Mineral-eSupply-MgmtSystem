import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebFooterRoutingModule } from './web-footer-routing.module';
import { WebFooterComponent } from './web-footer.component';


@NgModule({
  declarations: [
    WebFooterComponent
  ],
  imports: [
    CommonModule,
    WebFooterRoutingModule
  ]
})
export class WebFooterModule { }
