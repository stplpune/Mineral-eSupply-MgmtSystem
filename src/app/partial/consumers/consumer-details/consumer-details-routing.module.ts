import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerDetailsComponent } from './consumer-details.component';

const routes: Routes = [{ path: '', component: ConsumerDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerDetailsRoutingModule { }
