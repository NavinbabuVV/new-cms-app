import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepaidPageRoutingModule } from './prepaid-routing.module';

import { PrepaidPage } from './prepaid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrepaidPageRoutingModule
  ],
  declarations: [PrepaidPage]
})
export class PrepaidPageModule {}
