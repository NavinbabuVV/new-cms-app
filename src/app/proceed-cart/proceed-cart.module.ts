import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProceedCartPageRoutingModule } from './proceed-cart-routing.module';

import { ProceedCartPage } from './proceed-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProceedCartPageRoutingModule
  ],
  declarations: [ProceedCartPage]
})
export class ProceedCartPageModule {}
