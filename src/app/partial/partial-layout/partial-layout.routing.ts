import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from 'src/app/core/guards/expense.guard';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  { path: 'dashboard', loadChildren: () => import('../../partial/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' },  canActivate: [ExpenseGuard]  },

  // -------------------------Master routing  use for Admin, WBMDTCL--------------------------------------------------------//
  { path: 'register-user', loadChildren: () => import('../../partial/master/register-user/register-user.module').then(m => m.RegisterUserModule), data: { title: 'Register User' },  canActivate: [ExpenseGuard] },
  { path: 'register-collary', loadChildren: () => import('../../partial/master/register-collary/register-collary.module').then(m => m.RegisterCollaryModule), data: { title: 'Register Collary' },  canActivate: [ExpenseGuard]  },
  { path: 'coal-grade-master', loadChildren: () => import('../../partial/master/coal-grade-master/coal-grade-master.module').then(m => m.CoalGradeMasterModule), data: { title: 'Coal Grade Master' },  canActivate: [ExpenseGuard]  },
  { path: 'document-master', loadChildren: () => import('../../partial/master/document-master/document-master.module').then(m => m.DocumentMasterModule), data: { title: 'Document Master' },  canActivate: [ExpenseGuard]  },
  { path: 'grade-wise-rate-card-chart', loadChildren: () => import('../../partial/master/grade-wise-rate-card-chart/grade-wise-rate-card-chart.module').then(m => m.GradeWiseRateCardChartModule), data: { title: 'Grade Wise Rate Card Chart' },  canActivate: [ExpenseGuard]  },
  { path: 'consumer-registration', loadChildren: () => import('../../partial/master/consumer-registration/consumer-registration.module').then(m => m.ConsumerRegistrationModule), data: { title: 'Consumer Registration' },  canActivate: [ExpenseGuard]  },

  // -------------------------Application  routing  use for Admin,MSME,  WBMDTCL--------------------------------------------------------//
  { path: 'application', loadChildren: () => import('../../partial/application/application/application.module').then(m => m.ApplicationModule), data: { title: 'Application' },  canActivate: [ExpenseGuard]  },
  { path: 'approval', loadChildren: () => import('../../partial/application/approval/approval.module').then(m => m.ApprovalModule), data: { title: 'Approval' },  canActivate: [ExpenseGuard]  },
  { path: 'acoal-allocation', loadChildren: () => import('../../partial/application/coal-allocation/coal-allocation.module').then(m => m.CoalAllocationModule), data: { title: 'Coal Allocation' },  canActivate: [ExpenseGuard]  },

  //---------------------------- Coal Allocation-----------------------------------------------------//
  { path: 'coal-allocation', loadChildren: () => import('../../partial/coal-allocation/coal-allocation/coal-allocation.module').then(m => m.CoalAllocationModule), data: { title: 'Coal Allocation' },  canActivate: [ExpenseGuard]  },
  { path: 'booking_payment', loadChildren: () => import('../../partial/coal-allocation/booking-payment/booking-payment.module').then(m => m.BookingPaymentModule), data: { title: 'Booking Payment' },  canActivate: [ExpenseGuard]  },
  { path: 'delivery-order', loadChildren: () => import('../../partial/coal-allocation/delivery-order/delivery-order.module').then(m => m.DeliveryOrderModule), data: { title: 'Delivery Order' },  canActivate: [ExpenseGuard]  },

  // ------------------------- Coal Lifting----------------------------------------------------------//
  { path: 'loading-slip', loadChildren: () => import('../../partial/coal-lifting/loading-slip/loading-slip.module').then(m => m.LoadingSlipModule), data: { title: 'Loading Slip' },  canActivate: [ExpenseGuard]  },
  { path: 'challan_nnvoice-request', loadChildren: () => import('../../partial/coal-lifting/challan-nnvoice-request/challan-nnvoice-request.module').then(m => m.ChallanNnvoiceRequestModule), data: { title: 'Challan Invoice Request' },  canActivate: [ExpenseGuard]  },
  { path: 'generate_msme_invoice-challan', loadChildren: () => import('../../partial/coal-lifting/generate-msme-invoice-challan/generate-msme-invoice-challan.module').then(m => m.GenerateMsmeInvoiceChallanModule), data: { title: 'Generate Msme Invoice Challan' },  canActivate: [ExpenseGuard]  },

  // ------------------------- Vehicle Management----------------------------------------------------------//
  { path: 'register-vehicle', loadChildren: () => import('../../partial/vehicle-management/register-vehicle/register-vehicle.module').then(m => m.RegisterVehicleModule), data: { title: 'Register Vehicle' },  canActivate: [ExpenseGuard]  },
  { path: 'vehicle-tracking', loadChildren: () => import('../../partial/vehicle-management/vehicle-tracking/vehicle-tracking.module').then(m => m.VehicleTrackingModule), data: { title: 'Vehicle Tracking' },  canActivate: [ExpenseGuard]  },

  // ------------------------- consumers Management----------------------------------------------------------//
  { path: 'consumers', loadChildren: () => import('../../partial/consumers/consumers.module').then(m => m.ConsumersModule), data: { title: 'Consumers' },  canActivate: [ExpenseGuard]  },

  // ------------------------- Profile page ----------------------------------------------------------//
  { path: 'my_profile', loadChildren: () => import('../../partial/my-profile/my-profile.module').then(m => m.MyProfileModule), data: { title: 'MyProfile' },  canActivate: [ExpenseGuard]  },

  // --------------------------------------MIS Reports----------------------------------------------------------//
  { path: 'daily-lifting-chart', loadChildren: () => import('../../partial/mis-reports/daily-lifting-chart/daily-lifting-chart.module').then(m => m.DailyLiftingChartModule), data: { title: 'Daily Lifting Chart' },  canActivate: [ExpenseGuard]  },
  { path: 'monthly-allocation-to-msme', loadChildren: () => import('../../partial/mis-reports/monthly-allocation-to-msme/monthly-allocation-to-msme.module').then(m => m.MonthlyAllocationToMsmeModule), data: { title: 'Monthly Allocation To Msme' },  canActivate: [ExpenseGuard]  },
  { path: 'etp_report', loadChildren: () => import('../../partial/mis-reports/etp-report/etp-report.module').then(m => m.EtpReportModule), data: { title: 'Etp Report' },  canActivate: [ExpenseGuard] },

  // ------------------------------------------Settings  ----------------------------------------------------------//
  { path: 'user-right-access', loadChildren: () => import('../../partial/settings/user-right-access/user-right-access.module').then(m => m.UserRightAccessModule), data: { title: 'User Right Access' },  canActivate: [ExpenseGuard]  },

];
