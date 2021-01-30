import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtppagePageRoutingModule } from './otppage-routing.module';

import { OtppagePage } from './otppage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtppagePageRoutingModule
  ],
  declarations: [OtppagePage]
})
export class OtppagePageModule {}
