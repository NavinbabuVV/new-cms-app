import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartneridPageRoutingModule } from './partnerid-routing.module';

import { PartneridPage } from './partnerid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartneridPageRoutingModule
  ],
  declarations: [PartneridPage]
})
export class PartneridPageModule {}
