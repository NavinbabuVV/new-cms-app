import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanpagePageRoutingModule } from './scanpage-routing.module';

import { ScanpagePage } from './scanpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanpagePageRoutingModule
  ],
  declarations: [ScanpagePage]
})
export class ScanpagePageModule {}
