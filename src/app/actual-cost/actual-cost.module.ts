import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualCostPageRoutingModule } from './actual-cost-routing.module';

import { ActualCostPage } from './actual-cost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualCostPageRoutingModule
  ],
  declarations: [ActualCostPage]
})
export class ActualCostPageModule {}
