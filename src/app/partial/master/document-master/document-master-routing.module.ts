import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentMasterComponent } from './document-master.component';

const routes: Routes = [{ path: '', component: DocumentMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentMasterRoutingModule { }
