import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalSearchResultPageRoutingModule } from './global-search-result-routing.module';

import { GlobalSearchResultPage } from './global-search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalSearchResultPageRoutingModule
  ],
  declarations: [GlobalSearchResultPage]
})
export class GlobalSearchResultPageModule {}
