import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResellerManagementPage } from './reseller-management.page';

const routes: Routes = [
  {
    path: '',
    component: ResellerManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResellerManagementPageRoutingModule {}
