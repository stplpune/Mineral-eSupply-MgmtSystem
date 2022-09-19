import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumersComponent } from './consumers.component';

const routes: Routes = [{ path: '', component: ConsumersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumersRoutingModule { }
