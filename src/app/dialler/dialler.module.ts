import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiallerPageRoutingModule } from './dialler-routing.module';

import { DiallerPage } from './dialler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiallerPageRoutingModule
  ],
  declarations: [DiallerPage]
})
export class DiallerPageModule {}
