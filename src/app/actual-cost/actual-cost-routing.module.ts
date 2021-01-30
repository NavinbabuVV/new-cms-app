import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualCostPage } from './actual-cost.page';

const routes: Routes = [
  {
    path: '',
    component: ActualCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualCostPageRoutingModule {}
