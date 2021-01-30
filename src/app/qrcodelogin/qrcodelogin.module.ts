import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeloginPageRoutingModule } from './qrcodelogin-routing.module';

import { QrcodeloginPage } from './qrcodelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeloginPageRoutingModule
  ],
  declarations: [QrcodeloginPage]
})
export class QrcodeloginPageModule {}
