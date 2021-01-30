import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewQutationPageRoutingModule } from './view-qutation-routing.module';

import { ViewQutationPage } from './view-qutation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewQutationPageRoutingModule
  ],
  declarations: [ViewQutationPage]
})
export class ViewQutationPageModule {}
