import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResellerTicketAssignPagePageRoutingModule } from './reseller-ticket-assign-page-routing.module';

import { ResellerTicketAssignPagePage } from './reseller-ticket-assign-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResellerTicketAssignPagePageRoutingModule
  ],
  declarations: [ResellerTicketAssignPagePage]
})
export class ResellerTicketAssignPagePageModule {}
