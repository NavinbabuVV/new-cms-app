import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DidNumberPage } from './did-number.page';

const routes: Routes = [
  {
    path: '',
    component: DidNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DidNumberPageRoutingModule {}
