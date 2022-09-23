import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './partial/errors/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './partial/errors/access-denied/access-denied.component';
import { CheckLoggedInGuard } from './core/guards/check-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: WebLayoutComponent,
    canActivate: [CheckLoggedInGuard],
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
      { path: 'access-denied', component: AccessDeniedComponent},
     ]
  },

  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
