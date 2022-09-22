import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRightsAccessComponent } from './user-rights-access.component';

const routes: Routes = [{ path: '', component: UserRightsAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRightsAccessRoutingModule { }
