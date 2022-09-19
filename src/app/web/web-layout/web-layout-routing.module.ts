import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule),data: { title: ' Home' } },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: { title: 'Login' }, },
  { path: 'forget-password', loadChildren: () => import('../../web/forget-password/forget-password.module').then(m => m.ForgetPasswordModule), data: { title: 'Forget Password' } },
  { path: 'about-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule), data: { title: 'About Us' } },
  { path: 'screen-reader-access', loadChildren: () => import('../../web/screen-reader-access/screen-reader-access.module').then(m => m.ScreenReaderAccessModule), data: { title: 'Screen Reader Access' } },
  { path: 'application', loadChildren: () => import('../../partial/application/application/application.module').then(m => m.ApplicationModule), data: { title: 'Application' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }
