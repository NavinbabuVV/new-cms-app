import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingPayoutsPage } from './listing-payouts.page';

const routes: Routes = [
  {
    path: '',
    component: ListingPayoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingPayoutsPageRoutingModule {}
