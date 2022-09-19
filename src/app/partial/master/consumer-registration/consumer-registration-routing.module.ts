import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerRegistrationComponent } from './consumer-registration.component';

const routes: Routes = [{ path: '', component: ConsumerRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRegistrationRoutingModule { }
