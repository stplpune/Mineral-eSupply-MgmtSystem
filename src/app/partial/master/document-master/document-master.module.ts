import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentMasterRoutingModule } from './document-master-routing.module';
import { DocumentMasterComponent } from './document-master.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    DocumentMasterComponent
  ],
  imports: [
    CommonModule,
    DocumentMasterRoutingModule,
    AngularMaterialModule
  ]
})
export class DocumentMasterModule { }
