import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportTicketPageRoutingModule } from './support-ticket-routing.module';

import { SupportTicketPage } from './support-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportTicketPageRoutingModule
  ],
  declarations: [SupportTicketPage]
})
export class SupportTicketPageModule {}
