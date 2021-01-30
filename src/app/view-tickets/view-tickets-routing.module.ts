import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTicketsPage } from './view-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTicketsPageRoutingModule {}
