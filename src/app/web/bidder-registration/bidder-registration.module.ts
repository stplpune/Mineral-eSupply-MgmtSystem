import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidderRegistrationRoutingModule } from './bidder-registration-routing.module';
import { BidderRegistrationComponent } from './bidder-registration.component';


@NgModule({
  declarations: [
    BidderRegistrationComponent
  ],
  imports: [
    CommonModule,
    BidderRegistrationRoutingModule
  ]
})
export class BidderRegistrationModule { }
