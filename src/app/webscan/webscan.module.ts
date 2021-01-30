import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebscanPageRoutingModule } from './webscan-routing.module';

import { WebscanPage } from './webscan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebscanPageRoutingModule
  ],
  declarations: [WebscanPage]
})
export class WebscanPageModule {}
