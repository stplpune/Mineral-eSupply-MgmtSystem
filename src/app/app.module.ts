import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { FooterComponent } from './partial/partial-layout/footer/footer.component';
import { HeaderComponent } from './partial/partial-layout/header/header.component';
import { SidebarComponent } from './partial/partial-layout/sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { ConfigService } from './configs/config.service';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from './partial/dialogs/change-password/change-password.component';
import { LogoutComponent } from './partial/dialogs/logout/logout.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeModule } from './theme/theme.module';
import { AgmDrawingModule } from '@agm/drawing';
import { ConfirmationComponent } from './partial/dialogs/confirmation/confirmation.component';
import { SuccessComponent } from './partial/dialogs/success/success.component';
import { PageNotFoundComponent } from './partial/errors/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './partial/errors/access-denied/access-denied.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    PartialLayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ChangePasswordComponent,
    LogoutComponent,
    ConfirmationComponent,
    SuccessComponent,
    PageNotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ThemeModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    NgApexchartsModule,
    AgmDrawingModule,
    AgmCoreModule.forRoot(ConfigService.googleApiObj),
  ],
  providers: [Title,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
