import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckLoggedInGuard } from './core/guards/check-logged-in.guard';
import { ExpenseGuard } from './core/guards/expense.guard';

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
      { path: '', loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule), data: { title: 'Login' }, canActivate: [ExpenseGuard] },

      { path: 'dashboard', loadChildren: () => import('./partial/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' },  canActivate: [ExpenseGuard]  },

      // -------------------------Master routing  use for Admin, WBMDTCL--------------------------------------------------------//
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

      //---------------------------- Coal Allocation-----------------------------------------------------//
      { path: 'coal-allocation', loadChildren: () => import('./partial/coal-allocation/coal-allocation/coal-allocation.module').then(m => m.CoalAllocationModule) },
      { path: 'booking_payment', loadChildren: () => import('./partial/coal-allocation/booking-payment/booking-payment.module').then(m => m.BookingPaymentModule) },
      { path: 'delivery-order', loadChildren: () => import('./partial/coal-allocation/delivery-order/delivery-order.module').then(m => m.DeliveryOrderModule) },

      // ------------------------- Coal Lifting----------------------------------------------------------//
      { path: 'loading-slip', loadChildren: () => import('./partial/coal-lifting/loading-slip/loading-slip.module').then(m => m.LoadingSlipModule) },
      { path: 'challan_nnvoice-request', loadChildren: () => import('./partial/coal-lifting/challan-nnvoice-request/challan-nnvoice-request.module').then(m => m.ChallanNnvoiceRequestModule) },
      { path: 'generate_msme_invoice-challan', loadChildren: () => import('./partial/coal-lifting/generate-msme-invoice-challan/generate-msme-invoice-challan.module').then(m => m.GenerateMsmeInvoiceChallanModule) },

      // ------------------------- Vehicle Management----------------------------------------------------------//
      { path: 'register-vehicle', loadChildren: () => import('./partial/vehicle-management/register-vehicle/register-vehicle.module').then(m => m.RegisterVehicleModule) },
      { path: 'vehicle-tracking', loadChildren: () => import('./partial/vehicle-management/vehicle-tracking/vehicle-tracking.module').then(m => m.VehicleTrackingModule) },

      // ------------------------- consumers Management----------------------------------------------------------//
      { path: 'consumers', loadChildren: () => import('./partial/consumers/consumers.module').then(m => m.ConsumersModule) },

      // ------------------------- Profile page ----------------------------------------------------------//
      { path: 'my_profile', loadChildren: () => import('./partial/my-profile/my-profile.module').then(m => m.MyProfileModule) },

      // --------------------------------------MIS Reports----------------------------------------------------------//
      { path: 'daily-lifting-chart', loadChildren: () => import('./partial/mis-reports/daily-lifting-chart/daily-lifting-chart.module').then(m => m.DailyLiftingChartModule) },
      { path: 'monthly-allocation-to-msme', loadChildren: () => import('./partial/mis-reports/monthly-allocation-to-msme/monthly-allocation-to-msme.module').then(m => m.MonthlyAllocationToMsmeModule) },
      { path: 'etp_report', loadChildren: () => import('./partial/mis-reports/etp-report/etp-report.module').then(m => m.EtpReportModule) },

      // ------------------------------------------Settings  ----------------------------------------------------------//
      { path: 'user-right-access', loadChildren: () => import('./partial/settings/user-right-access/user-right-access.module').then(m => m.UserRightAccessModule) },
    ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
