import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DidNumberPageRoutingModule } from './did-number-routing.module';

import { DidNumberPage } from './did-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DidNumberPageRoutingModule
  ],
  declarations: [DidNumberPage]
})
export class DidNumberPageModule {}
