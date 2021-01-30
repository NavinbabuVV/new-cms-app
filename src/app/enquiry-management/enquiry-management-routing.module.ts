import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiryManagementPage } from './enquiry-management.page';

const routes: Routes = [
  {
    path: '',
    component: EnquiryManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiryManagementPageRoutingModule {}
