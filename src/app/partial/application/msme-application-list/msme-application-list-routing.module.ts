import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsmeApplicationListComponent } from './msme-application-list.component';

const routes: Routes = [{ path: '', component: MsmeApplicationListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsmeApplicationListRoutingModule { }
