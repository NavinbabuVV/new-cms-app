import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderLicensePage } from './order-license.page';

const routes: Routes = [
  {
    path: '',
    component: OrderLicensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderLicensePageRoutingModule {}
