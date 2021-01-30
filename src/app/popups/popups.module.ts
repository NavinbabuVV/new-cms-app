import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupsPageRoutingModule } from './popups-routing.module';

import { PopupsPage } from './popups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupsPageRoutingModule
  ],
  declarations: [PopupsPage]
})
export class PopupsPageModule {}
