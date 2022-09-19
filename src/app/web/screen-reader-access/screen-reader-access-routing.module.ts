import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenReaderAccessComponent } from './screen-reader-access.component';

const routes: Routes = [{ path: '', component: ScreenReaderAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenReaderAccessRoutingModule { }
