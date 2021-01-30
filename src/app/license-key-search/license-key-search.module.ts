import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenseKeySearchPageRoutingModule } from './license-key-search-routing.module';

import { LicenseKeySearchPage } from './license-key-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenseKeySearchPageRoutingModule
  ],
  declarations: [LicenseKeySearchPage]
})
export class LicenseKeySearchPageModule {}
