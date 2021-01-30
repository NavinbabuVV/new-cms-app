import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPayoutsPageRoutingModule } from './listing-payouts-routing.module';

import { ListingPayoutsPage } from './listing-payouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPayoutsPageRoutingModule
  ],
  declarations: [ListingPayoutsPage]
})
export class ListingPayoutsPageModule {}
