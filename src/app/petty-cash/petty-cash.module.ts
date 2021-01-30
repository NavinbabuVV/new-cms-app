import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PettyCashPageRoutingModule } from './petty-cash-routing.module';

import { PettyCashPage } from './petty-cash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PettyCashPageRoutingModule
  ],
  declarations: [PettyCashPage]
})
export class PettyCashPageModule {}
