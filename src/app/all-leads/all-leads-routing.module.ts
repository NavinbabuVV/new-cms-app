import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLeadsPage } from './all-leads.page';

const routes: Routes = [
  {
    path: '',
    component: AllLeadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLeadsPageRoutingModule {}
