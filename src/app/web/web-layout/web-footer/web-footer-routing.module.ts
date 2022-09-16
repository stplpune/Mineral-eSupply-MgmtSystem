import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebFooterComponent } from './web-footer.component';

const routes: Routes = [{ path: '', component: WebFooterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebFooterRoutingModule { }
