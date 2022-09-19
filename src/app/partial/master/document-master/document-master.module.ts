import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentMasterRoutingModule } from './document-master-routing.module';
import { DocumentMasterComponent } from './document-master.component';


@NgModule({
  declarations: [
    DocumentMasterComponent
  ],
  imports: [
    CommonModule,
    DocumentMasterRoutingModule
  ]
})
export class DocumentMasterModule { }
