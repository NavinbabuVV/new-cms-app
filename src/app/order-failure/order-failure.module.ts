import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderFailurePageRoutingModule } from './order-failure-routing.module';

import { OrderFailurePage } from './order-failure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderFailurePageRoutingModule
  ],
  declarations: [OrderFailurePage]
})
export class OrderFailurePageModule {}
