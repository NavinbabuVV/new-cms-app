import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayCurrencyPageRoutingModule } from './today-currency-routing.module';

import { TodayCurrencyPage } from './today-currency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayCurrencyPageRoutingModule
  ],
  declarations: [TodayCurrencyPage]
})
export class TodayCurrencyPageModule {}
