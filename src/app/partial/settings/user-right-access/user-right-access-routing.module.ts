import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRightAccessComponent } from './user-right-access.component';

const routes: Routes = [{ path: '', component: UserRightAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRightAccessRoutingModule { }
