import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewseventsPageRoutingModule } from './newsevents-routing.module';

import { NewseventsPage } from './newsevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewseventsPageRoutingModule
  ],
  declarations: [NewseventsPage]
})
export class NewseventsPageModule {}
