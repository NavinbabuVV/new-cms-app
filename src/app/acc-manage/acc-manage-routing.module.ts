import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccManagePage } from './acc-manage.page';

const routes: Routes = [
  {
    path: '',
    component: AccManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccManagePageRoutingModule {}
