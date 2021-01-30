import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResellerTicketAssignPagePage } from './reseller-ticket-assign-page.page';

const routes: Routes = [
  {
    path: '',
    component: ResellerTicketAssignPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResellerTicketAssignPagePageRoutingModule {}
