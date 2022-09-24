import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForfeitComponent } from './forfeit.component';

const routes: Routes = [{ path: '', component: ForfeitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForfeitRoutingModule { }
