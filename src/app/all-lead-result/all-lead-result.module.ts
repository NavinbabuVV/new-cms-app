import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLeadResultPageRoutingModule } from './all-lead-result-routing.module';

import { AllLeadResultPage } from './all-lead-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLeadResultPageRoutingModule
  ],
  declarations: [AllLeadResultPage]
})
export class AllLeadResultPageModule {}
