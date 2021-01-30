import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLeadResultPage } from './all-lead-result.page';

const routes: Routes = [
  {
    path: '',
    component: AllLeadResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLeadResultPageRoutingModule {}
