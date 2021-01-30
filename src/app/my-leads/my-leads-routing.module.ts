import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLeadsPage } from './my-leads.page';

const routes: Routes = [
  {
    path: '',
    component: MyLeadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLeadsPageRoutingModule {}
