import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnquiryTicketAssignPageRoutingModule } from './enquiry-ticket-assign-routing.module';

import { EnquiryTicketAssignPage } from './enquiry-ticket-assign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnquiryTicketAssignPageRoutingModule
  ],
  declarations: [EnquiryTicketAssignPage]
})
export class EnquiryTicketAssignPageModule {}
