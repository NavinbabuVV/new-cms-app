import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallHistoryPageRoutingModule } from './call-history-routing.module';

import { CallHistoryPage } from './call-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallHistoryPageRoutingModule
  ],
  declarations: [CallHistoryPage]
})
export class CallHistoryPageModule {}
