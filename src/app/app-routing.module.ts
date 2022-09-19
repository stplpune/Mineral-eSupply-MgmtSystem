import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckLoggedInGuard } from './core/guards/check-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule), canActivate: [CheckLoggedInGuard] },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: PartialLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule), data: { title: 'Login' } },

      { path: 'dashboard', loadChildren: () => import('./partial/dashboard/dashboard.module').then(m => m.DashboardModule) },

      // -------------------------Master routing  use for Admin, WBMDTCL--------------------------------------------------------//

      { path: 'demo-bidder-reg', loadChildren: () => import('./web/demo-bidder-reg/demo-bidder-reg.module').then(m => m.DemoBidderRegModule) },
      { path: 'register-user', loadChildren: () => import('./partial/master/register-user/register-user.module').then(m => m.RegisterUserModule) },
      { path: 'register-collary', loadChildren: () => import('./partial/master/register-collary/register-collary.module').then(m => m.RegisterCollaryModule) },
      { path: 'coal-grade-master', loadChildren: () => import('./partial/master/coal-grade-master/coal-grade-master.module').then(m => m.CoalGradeMasterModule) },
      { path: 'document-master', loadChildren: () => import('./partial/master/document-master/document-master.module').then(m => m.DocumentMasterModule) },
      { path: 'grade-wise-rate-card-chart', loadChildren: () => import('./partial/master/grade-wise-rate-card-chart/grade-wise-rate-card-chart.module').then(m => m.GradeWiseRateCardChartModule) },
      { path: 'consumer-registration', loadChildren: () => import('./partial/master/consumer-registration/consumer-registration.module').then(m => m.ConsumerRegistrationModule) },
     
      // -------------------------Application  routing  use for Admin,MSME,  WBMDTCL--------------------------------------------------------//
      { path: 'application', loadChildren: () => import('./partial/application/application/application.module').then(m => m.ApplicationModule) },
      { path: 'approval', loadChildren: () => import('./partial/application/approval/approval.module').then(m => m.ApprovalModule) },
      { path: 'acoal-allocation', loadChildren: () => import('./partial/application/coal-allocation/coal-allocation.module').then(m => m.CoalAllocationModule) },
    
    ]

  },
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
