import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebLayoutRoutingModule } from './web-layout-routing.module';
import { WebLayoutComponent } from './web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { WebFooterComponent } from './web-footer/web-footer.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent
  ],
  imports: [
    CommonModule,
    WebLayoutRoutingModule
  ]
})
export class WebLayoutModule { }
