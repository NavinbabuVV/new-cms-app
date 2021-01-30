import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQutationPage } from './view-qutation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewQutationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQutationPageRoutingModule {}
