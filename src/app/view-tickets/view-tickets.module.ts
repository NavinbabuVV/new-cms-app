import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTicketsPageRoutingModule } from './view-tickets-routing.module';

import { ViewTicketsPage } from './view-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTicketsPageRoutingModule
  ],
  declarations: [ViewTicketsPage]
})
export class ViewTicketsPageModule {}
