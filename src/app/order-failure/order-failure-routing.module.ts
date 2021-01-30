import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderFailurePage } from './order-failure.page';

const routes: Routes = [
  {
    path: '',
    component: OrderFailurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderFailurePageRoutingModule {}
