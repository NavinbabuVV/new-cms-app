import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiryTicketAssignPage } from './enquiry-ticket-assign.page';

const routes: Routes = [
  {
    path: '',
    component: EnquiryTicketAssignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiryTicketAssignPageRoutingModule {}
