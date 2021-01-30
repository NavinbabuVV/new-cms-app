import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderLicensePageRoutingModule } from './order-license-routing.module';

import { OrderLicensePage } from './order-license.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderLicensePageRoutingModule
  ],
  declarations: [OrderLicensePage]
})
export class OrderLicensePageModule {}
