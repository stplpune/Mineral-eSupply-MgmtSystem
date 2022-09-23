import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './partial/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule)},
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: PartialLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule)},
     ]
  },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
