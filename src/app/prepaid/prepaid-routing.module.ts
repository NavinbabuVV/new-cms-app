import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepaidPage } from './prepaid.page';

const routes: Routes = [
  {
    path: '',
    component: PrepaidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepaidPageRoutingModule {}
