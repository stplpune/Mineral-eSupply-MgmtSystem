import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCollaryComponent } from './register-collary.component';

const routes: Routes = [{ path: '', component: RegisterCollaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterCollaryRoutingModule { }
