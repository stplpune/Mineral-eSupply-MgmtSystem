import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebLayoutRoutingModule } from './web-layout-routing.module';
import { WebLayoutComponent } from './web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent
  ],
  imports: [
    CommonModule,
    WebLayoutRoutingModule,
    ThemeModule,
    MatSlideToggleModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class WebLayoutModule { }
