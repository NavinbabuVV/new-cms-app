import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicePaymentPageRoutingModule } from './invoice-payment-routing.module';

import { InvoicePaymentPage } from './invoice-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePaymentPageRoutingModule
  ],
  declarations: [InvoicePaymentPage]
})
export class InvoicePaymentPageModule {}
