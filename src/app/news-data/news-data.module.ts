import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDataPageRoutingModule } from './news-data-routing.module';

import { NewsDataPage } from './news-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDataPageRoutingModule
  ],
  declarations: [NewsDataPage]
})
export class NewsDataPageModule {}
