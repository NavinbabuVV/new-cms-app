import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicePaymentPage } from './invoice-payment.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicePaymentPageRoutingModule {}
