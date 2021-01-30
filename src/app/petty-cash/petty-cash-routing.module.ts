import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PettyCashPage } from './petty-cash.page';

const routes: Routes = [
  {
    path: '',
    component: PettyCashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PettyCashPageRoutingModule {}
